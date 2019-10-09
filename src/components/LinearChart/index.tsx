import React from 'react'
import { uid } from 'react-uid'

import * as d3 from 'd3'
import * as _ from 'lodash'

import { Axis, GridConfig } from '@/components/LinearChart/components/Axis'

import { Line as LineComponent } from './components/Line'
import { Zoom } from './components/Zoom'
import css from './index.css'

export type Line = {
  color: string
  values: readonly Item[]
  dots?: boolean
}
export type Item = { x: number; y: number }
export type NumberRange = readonly [number, number]

type Props = {
  lines: readonly Line[]
  gridConfig: GridConfig
  withZoom?: boolean
  isVertical?: boolean
}

type State = {
  xDomain: NumberRange
  yDomain: NumberRange
  width: number
  height: number
  paddingX: number
  paddingY: number
}

export const TRANSITION_DURATIONS = {
  ZOOM: 750,
  SIZE: 600,
}

const DOT_SIZE = 5

const domainPaddings = {
  horizontal: {
    top: 0.055,
    right: 0.06,
    bottom: 0,
    left: 0,
  },
  vertical: {
    top: 0.04,
    bottom: 0.04,
    right: 0.06,
    left: 0.06,
  },
}

const getIndexWithFallbackToDefault = (index: number, def: number): number =>
  index < 0 ? def : index

const padDomain = (
  domain: NumberRange,
  paddingStart?: number,
  paddingEnd?: number
): NumberRange => {
  const [start, end] = domain
  const delta = domain[1] - domain[0]

  return [
    paddingStart ? start - paddingStart * delta : start,
    paddingEnd ? end + paddingEnd * delta : end,
  ]
}

const getXRange = (width: number) => [0, width] as NumberRange
const getYRange = (height: number) =>
  [
    // Чтобы нарисовался гридлайн на нижней оси
    height - 1,
    0,
  ] as NumberRange

const getXScale = (domain: NumberRange, width: number) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(getXRange(width))
const getYScale = (domain: NumberRange, height: number) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(getYRange(height))

export class LinearChart extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>()

  // d3 ограничивает по 1 анимации на элемент, поэтому создаём фэйковые элементы для твинов стэйта
  paddingTransitionEl = {} as Element
  secondaryDomainTransitionEl = {} as Element

  uid = uid(this)
  lineClipId = `line_clipPath_${this.uid}`
  dotsClipId = `dots_clipPath_${this.uid}`

  state: State = {
    xDomain: [0, 0],
    yDomain: [0, 0],
    width: 0,
    height: 0,
    paddingX: 0,
    paddingY: 0,
  }

  targetSecondaryDomain = this.state.xDomain
  targetPaddings = {
    paddingX: this.state.paddingX,
    paddingY: this.state.paddingY,
  }

  componentDidMount() {
    this.updateDomains()
    this.updateSize()

    window.addEventListener('resize', this.updateSize)
  }

  componentDidUpdate(prevProps: Props) {
    const {
      props: { lines, isVertical },
    } = this

    if (lines !== prevProps.lines || isVertical !== prevProps.isVertical) {
      this.updateDomains()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  render() {
    const {
      props: {
        gridConfig,
        gridConfig: {
          x: { labels: xLabelsPos },
          y: { labels: yLabelsPos },
        },
        withZoom,
        isVertical,
      },
      state: { paddingX, paddingY, xDomain, yDomain },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
    const { main: mainAxis } = this.getAxis()

    const lineClipPath = `url(#${this.lineClipId})`
    const scaleX = getXScale(xDomain, svgWidth)
    const scaleY = getYScale(yDomain, svgHeight)
    const dotRadius = DOT_SIZE / 2
    const xOnBottom = xLabelsPos === 'bottom'
    const yOnLeft = yLabelsPos === 'left'

    return (
      <div ref={this.ref} className={css.main}>
        <svg
          className={css.svg}
          width={svgWidth}
          height={svgHeight}
          style={{
            ...(xOnBottom ? { top: 0 } : { bottom: 0 }),
            ...(yOnLeft ? { right: 0 } : { left: 0 }),
          }}
        >
          <defs>
            <clipPath id={this.lineClipId}>
              <rect width={svgWidth} height={svgHeight} />
            </clipPath>
            <clipPath id={this.dotsClipId}>
              <rect
                width={svgWidth + 2 * dotRadius}
                height={svgHeight + 2 * dotRadius}
                x={-1 * dotRadius}
                y={-1 * dotRadius}
              />
            </clipPath>
          </defs>

          <Axis
            width={svgWidth}
            height={svgHeight}
            scales={{
              x: scaleX,
              y: scaleY,
            }}
            gridConfig={gridConfig}
            lineClipPath={lineClipPath}
            onAxisSizeChange={this.onAxisSizeChange}
          />

          {this.getLines().map(line => (
            <LineComponent
              key={line.color}
              values={[...line.values]}
              color={line.color}
              dotRadius={line.dots ? dotRadius : undefined}
              scaleX={scaleX}
              scaleY={scaleY}
              lineClipPath={lineClipPath}
              dotsClipPath={`url(#${this.dotsClipId})`}
            />
          ))}
        </svg>

        {withZoom && (
          <Zoom
            isVertical={Boolean(isVertical)}
            xRange={getXRange(svgWidth)}
            yRange={getYRange(svgHeight)}
            paddingX={paddingX}
            paddingY={paddingY}
            xLabelsPos={xLabelsPos}
            yLabelsPos={yLabelsPos}
            domain={mainAxis.currentDomain}
            originalDomain={mainAxis.getDomain(this.getAllValues())}
            onZoom={this.onZoom}
          />
        )}
      </div>
    )
  }

  getXDomain = (items: readonly Item[]): NumberRange => {
    const { isVertical } = this.props
    const { left, right } = domainPaddings[isVertical ? 'vertical' : 'horizontal']
    const domain = d3.extent(items, v => v.x) as NumberRange
    return padDomain(domain, left, right)
  }

  getYDomain = (items: readonly Item[]): NumberRange => {
    const { isVertical } = this.props
    const { top, bottom } = domainPaddings[isVertical ? 'vertical' : 'horizontal']
    const domain = d3.extent(items, v => v.y)
    return padDomain(
      (isVertical
        ? [...domain].reverse() // Чтобы 0 был сверху
        : domain) as NumberRange,
      bottom,
      top
    )
  }

  getLines = (): readonly Line[] => {
    const { lines, isVertical } = this.props

    return isVertical
      ? lines.map(line => ({
          ...line,
          values: _.sortBy(
            line.values.map(v => ({
              x: v.y,
              y: v.x,
            })),
            'y'
          ),
        }))
      : lines
  }
  getAllValues = (): readonly Item[] => _.flatten(this.getLines().map(l => l.values))

  getSvgSize = () => {
    const {
      state: { width, height, paddingX, paddingY },
    } = this

    return {
      svgWidth: Math.round(width - paddingX),
      svgHeight: Math.round(height - paddingY),
    }
  }

  updateDomains() {
    this.setState({
      xDomain: this.getXDomain(this.getAllValues()),
      yDomain: this.getYDomain(this.getAllValues()),
    })
  }

  updateSize = () => {
    const { width, height } = this.ref.current!.getBoundingClientRect()
    const newSize = { width, height }

    if (!_.isEqual(_.pick(this.state, ['width', 'height']), newSize)) {
      this.setState(newSize)
    }
  }

  onAxisSizeChange = ({ xAxisHeight, yAxisWidth }: { xAxisHeight: number; yAxisWidth: number }) => {
    const newPaddings = {
      paddingX: yAxisWidth,
      paddingY: xAxisHeight,
    }

    if (!_.isEqual(newPaddings, this.targetPaddings)) {
      this.targetPaddings = newPaddings

      const currentPaddings = _.pick(this.state, ['paddingX', 'paddingY'])

      if (!currentPaddings.paddingX || !currentPaddings.paddingY) {
        this.setState(newPaddings)
      } else {
        d3.select(this.paddingTransitionEl)
          .transition()
          .duration(TRANSITION_DURATIONS.SIZE)
          .tween('paddings', () => {
            const i = d3.interpolateObject(currentPaddings, newPaddings)

            return (t: number) => {
              this.setState({ ...i(t) })
            }
          })
      }
    }
  }

  getAxis = () => {
    const {
      state: { xDomain, yDomain },
      props: { isVertical },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
    const setXDomain = (domain: NumberRange) => this.setState({ xDomain: domain })
    const setYDomain = (domain: NumberRange) => this.setState({ yDomain: domain })

    return isVertical
      ? {
          main: {
            currentDomain: yDomain,
            getDomain: this.getYDomain,
            setDomain: setYDomain,
            getScale: getYScale,
            rescale: 'rescaleY',
            getValue: (v: Item) => v.y,
            size: svgHeight,
          },
          secondary: {
            currentDomain: xDomain,
            getDomain: this.getXDomain,
            setDomain: setXDomain,
          },
        }
      : {
          main: {
            currentDomain: xDomain,
            getDomain: this.getXDomain,
            setDomain: setXDomain,
            getScale: getXScale,
            rescale: 'rescaleX',
            getValue: (v: Item) => v.x,
            size: svgWidth,
          },
          secondary: {
            currentDomain: yDomain,
            getDomain: this.getYDomain,
            setDomain: setYDomain,
          },
        }
  }

  onZoom = () => {
    const { main: mainAxis, secondary: secondaryAxis } = this.getAxis()

    const originalMainDomain = mainAxis.getDomain(this.getAllValues())
    const originalMainScale = mainAxis.getScale(originalMainDomain, mainAxis.size)
    const newMainScale = d3.event.transform[mainAxis.rescale](originalMainScale)
    const newMainDomain = newMainScale.domain()

    if (_.isEqual(mainAxis.currentDomain, newMainDomain)) {
      return
    }

    mainAxis.setDomain(newMainDomain)

    // Значения в домене не всегда идут от меньшего к большему: у вертикального графика домен перевёрнут, чтобы 0 был наверху графика
    const domainMin = Math.min(...newMainDomain)
    const domainMax = Math.max(...newMainDomain)

    const lineDomains = this.getLines().map(({ values }) => {
      const zoomRangeIndexes = [
        getIndexWithFallbackToDefault(
          _.findLastIndex(values, v => mainAxis.getValue(v) <= domainMin),
          0
        ),
        getIndexWithFallbackToDefault(
          _.findIndex(values, v => mainAxis.getValue(v) >= domainMax),
          values.length - 1
        ),
      ].sort()

      const countLines = zoomRangeIndexes[1] - zoomRangeIndexes[0]

      // Если количество лучшей, которое мы видим больше двух, то нам нужен домен только видимых точек
      // Иначе мы берем домены и точек, которые за экраном
      const valuesInZoomRange =
        countLines > 2
          ? values.slice(zoomRangeIndexes[0] + (domainMin <= 0 ? 0 : 1), zoomRangeIndexes[1])
          : values.slice(zoomRangeIndexes[0], zoomRangeIndexes[1] + 1)

      return secondaryAxis.getDomain(valuesInZoomRange)
    })

    const newSecondaryDomain = [
      Math.min(...lineDomains.map(d => d[0])),
      Math.max(...lineDomains.map(d => d[1])),
    ] as NumberRange

    if (!_.isEqual(newSecondaryDomain, this.targetSecondaryDomain)) {
      this.targetSecondaryDomain = newSecondaryDomain

      d3.select(this.secondaryDomainTransitionEl)
        .transition()
        .duration(TRANSITION_DURATIONS.ZOOM)
        .tween('secondaryDomainTween', () => {
          const i = d3.interpolateArray([...secondaryAxis.currentDomain], [...newSecondaryDomain])

          return (t: number) => {
            // убеждаемся, что setDomain получит на входе массив с нужной длиной
            secondaryAxis.setDomain([i(t)[0], i(t)[1]] as NumberRange)
          }
        })
    }
  }
}
