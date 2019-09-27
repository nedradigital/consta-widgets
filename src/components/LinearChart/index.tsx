/* tslint:disable:readonly-array */
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
  values: Item[]
  dots?: boolean
}
export type Item = { x: number; y: number }
export type NumberRange = [number, number]
export type XLabelsPosition = 'top' | 'bottom'
export type YLabelsPosition = 'left' | 'right'

type Props = {
  lines: Line[]
  gridConfig: GridConfig
  withZoom?: boolean
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
const LINE_PADDING_X = 0.06
const LINE_PADDING_Y = 0.055

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
const getXDomain = (items: Item[]): NumberRange => {
  const domain = d3.extent(items, v => v.x) as NumberRange
  return padDomain(domain, 0, LINE_PADDING_X)
}
const getYDomain = (items: Item[]): NumberRange => {
  const domain = d3.extent(items, v => v.y) as NumberRange
  return padDomain(domain, 0, LINE_PADDING_Y)
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
    .domain(domain)
    .range(getXRange(width))
const getYScale = (domain: NumberRange, height: number) =>
  d3
    .scaleLinear()
    .domain(domain)
    .range(getYRange(height))

export class LinearChart extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>()

  // d3 ограничивает по 1 анимации на элемент, поэтому создаём фэйковые элементы для твинов стэйта
  paddingTransitionEl = {} as Element
  yDomainTransitionEl = {} as Element

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

  targetYDomain = this.state.yDomain
  targetPaddings = {
    paddingX: this.state.paddingX,
    paddingY: this.state.paddingY,
  }

  componentDidMount() {
    this.updateDomains()
    this.updateSize()

    // TODO ResizeObserver, чтобы реагировать на ресайз бокса на дашборде
    window.addEventListener('resize', this.updateSize)
  }

  componentDidUpdate(prevProps: Props) {
    const {
      props: { lines },
    } = this

    if (lines !== prevProps.lines) {
      this.updateDomains()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  render() {
    const {
      props: {
        lines,
        gridConfig,
        gridConfig: {
          x: { labels: xLabelsPos },
          y: { labels: yLabelsPos },
        },
        withZoom,
      },
      state: { paddingX, paddingY, xDomain, yDomain },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
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

          {lines.map(line => (
            <LineComponent
              key={line.color}
              values={line.values}
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
          <div
            className={css.zoom}
            style={{
              ...(xOnBottom ? { bottom: 0 } : { top: 0 }),
              ...(yOnLeft ? { left: paddingX } : { right: paddingX }),
              height: paddingY,
            }}
          >
            <Zoom
              xRange={getXRange(svgWidth)}
              yRange={getYRange(svgHeight)}
              xDomain={xDomain}
              originalXDomain={getXDomain(this.getAllValues())}
              onZoom={this.onZoom}
            />
          </div>
        )}
      </div>
    )
  }

  getAllValues = (): Item[] => _.flatten(this.props.lines.map(l => l.values))

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
      xDomain: getXDomain(this.getAllValues()),
      yDomain: getYDomain(this.getAllValues()),
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

  onZoom = () => {
    const {
      props: { lines },
    } = this
    const { svgWidth } = this.getSvgSize()

    const originalXDomain = getXDomain(this.getAllValues())
    const originalScaleX = getXScale(originalXDomain, svgWidth)
    const newX = d3.event.transform.rescaleX(originalScaleX)
    const newXDomain = newX.domain()

    if (_.isEqual(this.state.xDomain, newXDomain)) {
      return
    }

    this.setState({ xDomain: newXDomain })

    const lineDomains = lines.map(({ values }) => {
      const xRangeIndexes = [
        getIndexWithFallbackToDefault(_.findLastIndex(values, v => v.x <= newXDomain[0]), 0),
        getIndexWithFallbackToDefault(
          _.findIndex(values, v => v.x >= newXDomain[1]),
          values.length - 1
        ),
      ]
      const valuesToCalculateY = values.slice(xRangeIndexes[0], xRangeIndexes[1] + 1)
      return getYDomain(valuesToCalculateY)
    })

    const newYDomain = [
      Math.min(...lineDomains.map(d => d[0])),
      Math.max(...lineDomains.map(d => d[1])),
    ] as NumberRange

    if (!_.isEqual(newYDomain, this.targetYDomain)) {
      this.targetYDomain = newYDomain

      d3.select(this.yDomainTransitionEl)
        .transition()
        .duration(TRANSITION_DURATIONS.ZOOM)
        .tween('yDomain', () => {
          const i = d3.interpolateArray(this.state.yDomain, newYDomain)

          return (t: number) => {
            // d3 внутри мутирует массив, поэтому клонируем
            this.setState({ yDomain: [...i(t)] as NumberRange })
          }
        })
    }
  }
}
