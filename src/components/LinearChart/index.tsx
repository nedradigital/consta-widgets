import React from 'react'
import { uid } from 'react-uid'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { Axis, GridConfig } from '@/components/LinearChart/components/Axis'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { HoverLines } from './components/HoverLines'
import { LineTooltip } from './components/LineTooltip'
import { LineWithDots } from './components/LineWithDots'
import { Threshold } from './components/Threshold'
import { Zoom } from './components/Zoom'
import {
  calculateSecondaryDomain,
  flipPointsOnAxes,
  getMainTickValues,
  getSecondaryTickValues,
  getXRange,
  getXScale,
  getYRange,
  getYScale,
  padDomain,
} from './helpers'
import css from './index.css'

export type Item = { x: number | null; y: number | null }
export type NotEmptyItem = { x: number; y: number }
export const itemIsNotEmpty = (item: Item): item is NotEmptyItem =>
  isNotNil(item.x) && isNotNil(item.y)

type ThresholdLine = {
  name?: string
  values: readonly NotEmptyItem[]
}
export type Threshold = {
  max: ThresholdLine
  min?: ThresholdLine
}

export type Line = {
  colorGroupName: string
  values: readonly Item[]
  dots?: boolean
  withGradient?: boolean
  lineName: string
}
export type NumberRange = readonly [number, number]
export type TickValues = readonly number[]
export type ScaleLinear = d3.ScaleLinear<number, number>

type Props = {
  lines: readonly Line[]
  gridConfig: GridConfig
  threshold?: Threshold
  withZoom?: boolean
  isHorizontal: boolean
  formatValueForLabel: FormatValue
  formatValueForTooltip?: FormatValue
  formatValueForTooltipTitle?: FormatValue
  colorGroups: ColorGroups
  unit?: string
  onClickHoverLine?: (value: number) => void
}

export type HoveredMainValue = number | undefined

type State = {
  xDomain: NumberRange
  yDomain: NumberRange
  width: number
  height: number
  paddingX: number
  paddingY: number
  zoom: number
  xGuideValue: number
  yGuideValue: number
  hoveredMainValue: HoveredMainValue
}

export const INITIAL_DOMAIN = [Number.MIN_VALUE, Number.MAX_VALUE] as const

export const TRANSITION_DURATIONS = {
  ZOOM: 750,
  SIZE: 600,
}

const DOT_SIZE = 5

export const domainPaddings = {
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

export class LinearChart extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>()
  svgWrapperRef = React.createRef<SVGSVGElement>()

  resizeObserver = new ResizeObserver(() => this.updateSize())

  // d3 ограничивает по 1 анимации на элемент, поэтому создаём фэйковые элементы для твинов стэйта
  paddingTransitionEl = {} as Element
  secondaryDomainTransitionEl = {} as Element

  uid = uid(this)
  lineClipId = `line_clipPath_${this.uid}`
  dotsClipId = `dots_clipPath_${this.uid}`

  state: State = {
    xDomain: INITIAL_DOMAIN,
    yDomain: INITIAL_DOMAIN,
    width: 0,
    height: 0,
    paddingX: 0,
    paddingY: 0,
    zoom: 1,
    xGuideValue: 0,
    yGuideValue: 0,
    hoveredMainValue: undefined,
  }

  targetSecondaryDomain = this.state.xDomain
  targetPaddings = {
    paddingX: this.state.paddingX,
    paddingY: this.state.paddingY,
  }

  componentDidMount() {
    this.updateDomains()
    this.updateSize()

    this.resizeObserver.observe(this.ref.current!)
  }

  componentDidUpdate(prevProps: Props) {
    const {
      props: { lines, threshold, isHorizontal },
    } = this

    if (
      lines !== prevProps.lines ||
      isHorizontal !== prevProps.isHorizontal ||
      threshold !== prevProps.threshold
    ) {
      this.updateDomains()
    }
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.ref.current!)
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
        isHorizontal,
        lines,
        formatValueForLabel,
        formatValueForTooltip,
        formatValueForTooltipTitle,
        colorGroups,
        unit,
        onClickHoverLine,
      },
      state: { paddingX, paddingY, xDomain, yDomain, xGuideValue, yGuideValue, hoveredMainValue },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
    const { main: mainAxis } = this.getAxis()
    const {
      mainLabelTickValues,
      mainGridTickValues,
      secondaryLabelTickValues,
      secondaryGridTickValues,
    } = this.getTicks()
    const threshold = this.getThreshold()

    const lineClipPath = `url(#${this.lineClipId})`
    const dotsClipPath = `url(#${this.dotsClipId})`
    const scaleX = getXScale(xDomain, svgWidth)
    const scaleY = getYScale(yDomain, svgHeight)
    const dotRadius = DOT_SIZE / 2
    const xOnBottom = xLabelsPos === 'bottom'
    const yOnLeft = yLabelsPos === 'left'

    return (
      <div ref={this.ref} className={css.main}>
        <LineTooltip
          lines={this.getLines()}
          isHorizontal={isHorizontal}
          scaleX={scaleX}
          scaleY={scaleY}
          colorGroups={colorGroups}
          hoveredMainValue={hoveredMainValue}
          anchorEl={this.svgWrapperRef.current}
          threshold={threshold}
          formatValueForLabel={formatValueForLabel}
          formatValueForTooltip={formatValueForTooltip}
          formatValueForTooltipTitle={formatValueForTooltipTitle}
        />
        <svg
          ref={this.svgWrapperRef}
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
            mainLabelTickValues={mainLabelTickValues}
            mainGridTickValues={mainGridTickValues}
            secondaryLabelTickValues={secondaryLabelTickValues}
            secondaryGridTickValues={secondaryGridTickValues}
            isHorizontal={isHorizontal}
            formatValueForLabel={formatValueForLabel}
            secondaryScaleUnit={unit}
            xGuideValue={xGuideValue}
            yGuideValue={yGuideValue}
          />

          <HoverLines
            lines={this.getLines()}
            scaleX={scaleX}
            scaleY={scaleY}
            width={svgWidth}
            height={svgHeight}
            isHorizontal={isHorizontal}
            hoveredMainValue={hoveredMainValue}
            onChangeHoveredMainValue={this.setHoveredMainValue}
            onClickLine={onClickHoverLine}
          />

          {threshold && (
            <Threshold
              scaleX={scaleX}
              scaleY={scaleY}
              maxPoints={threshold.max.values}
              minPoints={threshold.min?.values}
              clipPath={lineClipPath}
              isHorizontal={isHorizontal}
            />
          )}

          {this.getLines().map(line => {
            const gradientProps = line.withGradient
              ? ({
                  withGradient: true,
                  areaBottom: isHorizontal ? yDomain[0] : xDomain[0],
                } as const)
              : ({
                  withGradient: false,
                } as const)

            return (
              <LineWithDots
                key={line.colorGroupName}
                values={[...line.values]}
                color={colorGroups[line.colorGroupName]}
                hasDotRadius={line.dots}
                defaultDotRadius={dotRadius}
                scaleX={scaleX}
                scaleY={scaleY}
                lineClipPath={lineClipPath}
                dotsClipPath={dotsClipPath}
                hoveredMainValue={hoveredMainValue}
                isHorizontal={isHorizontal}
                {...gradientProps}
              />
            )
          })}
        </svg>

        {withZoom && (
          <Zoom
            isHorizontal={isHorizontal}
            xRange={getXRange(svgWidth)}
            yRange={getYRange(svgHeight)}
            paddingX={paddingX}
            paddingY={paddingY}
            xLabelsPos={xLabelsPos}
            yLabelsPos={yLabelsPos}
            domain={mainAxis.currentDomain}
            originalDomain={mainAxis.getDomain(this.getAllValues())}
            onZoom={this.onZoom}
            lines={lines}
          />
        )}
      </div>
    )
  }

  getXDomain = (items: readonly Item[]): NumberRange => {
    const { isHorizontal } = this.props
    const { zoom } = this.state
    const { left, right } = domainPaddings[isHorizontal ? 'horizontal' : 'vertical']
    const domain = d3.extent(items, v => v.x) as NumberRange
    return padDomain(domain, left, right, zoom)
  }

  getYDomain = (items: readonly Item[]): NumberRange => {
    const { isHorizontal } = this.props
    const { zoom } = this.state
    const { top, bottom } = domainPaddings[isHorizontal ? 'horizontal' : 'vertical']
    const domain = d3.extent(items, v => v.y)
    return padDomain(
      (isHorizontal
        ? domain
        : // Чтобы 0 был сверху
          [...domain].reverse()) as NumberRange,
      bottom,
      top,
      zoom
    )
  }

  getThresholdLines = () => {
    const { threshold, isHorizontal } = this.props

    if (!threshold) {
      return []
    }

    const { max, min = { values: [] } } = threshold

    return [flipPointsOnAxes(max.values, isHorizontal), flipPointsOnAxes(min.values, isHorizontal)]
  }

  getAllThresholdValues = (): readonly Item[] => _.flatten(this.getThresholdLines())

  getLines = (): readonly Line[] => {
    const { lines, isHorizontal } = this.props

    return isHorizontal
      ? lines
      : lines.map(line => ({
          ...line,
          values: _.sortBy(flipPointsOnAxes(line.values, isHorizontal), 'y'),
        }))
  }

  getThreshold = (): Threshold | undefined => {
    const { threshold, isHorizontal } = this.props

    if (!threshold) {
      return undefined
    }

    return {
      max: {
        ...threshold.max,
        values: flipPointsOnAxes(threshold.max.values, isHorizontal),
      },
      min: threshold.min && {
        ...threshold.min,
        values: flipPointsOnAxes(threshold.min.values, isHorizontal),
      },
    }
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

  getTicks = () => {
    const { isHorizontal, gridConfig } = this.props
    const { xGuideValue, yGuideValue, xDomain, yDomain } = this.state

    return {
      mainLabelTickValues: getMainTickValues({
        items: this.getAllValues(),
        domain: isHorizontal ? xDomain : yDomain,
        gridConfig,
        tickType: 'labelTicks',
        guideValue: isHorizontal ? xGuideValue : yGuideValue,
        isHorizontal,
      }),
      mainGridTickValues: getMainTickValues({
        items: this.getAllValues(),
        domain: isHorizontal ? xDomain : yDomain,
        gridConfig,
        tickType: 'gridTicks',
        guideValue: isHorizontal ? xGuideValue : yGuideValue,
        isHorizontal,
      }),
      secondaryLabelTickValues: getSecondaryTickValues({
        items: this.getAllValues(),
        domain: isHorizontal ? yDomain : xDomain,
        gridConfig,
        tickType: 'labelTicks',
        guideValue: isHorizontal ? yGuideValue : xGuideValue,
        isHorizontal,
      }),
      secondaryGridTickValues: getSecondaryTickValues({
        items: this.getAllValues(),
        domain: isHorizontal ? yDomain : xDomain,
        gridConfig,
        tickType: 'gridTicks',
        guideValue: isHorizontal ? yGuideValue : xGuideValue,
        isHorizontal,
      }),
    }
  }

  updateDomains() {
    const { zoom } = this.state

    /**
     * Включаем в расчеты значения из линий порога только при первоначальной
     * отрисовке или при изменениях данных с учетом того что зум равняется 1.
     */
    const linesValues = this.getAllValues()
    const thresholdValues = zoom === 1 ? this.getAllThresholdValues() : []
    const values: readonly Item[] = [...linesValues, ...thresholdValues]

    const xDomain = this.getXDomain(values)
    const yDomain = this.getYDomain(values)
    const [xGuideValue] = d3.extent(values, v => v.x) as NumberRange
    const [yGuideValue] = d3.extent(values, v => v.y) as NumberRange

    this.setState({
      xDomain,
      yDomain,
      xGuideValue,
      yGuideValue,
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
      props: { isHorizontal },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
    const setXDomain = (domain: NumberRange) => this.setState({ xDomain: domain })
    const setYDomain = (domain: NumberRange) => this.setState({ yDomain: domain })

    return isHorizontal
      ? {
          main: {
            currentDomain: xDomain,
            getDomain: this.getXDomain,
            setDomain: setXDomain,
            getScale: getXScale,
            rescale: 'rescaleX',
            getValue: (v: NotEmptyItem) => v.x,
            size: svgWidth,
          },
          secondary: {
            currentDomain: yDomain,
            getDomain: this.getYDomain,
            setDomain: setYDomain,
          },
        }
      : {
          main: {
            currentDomain: yDomain,
            getDomain: this.getYDomain,
            setDomain: setYDomain,
            getScale: getYScale,
            rescale: 'rescaleY',
            getValue: (v: NotEmptyItem) => v.y,
            size: svgHeight,
          },
          secondary: {
            currentDomain: xDomain,
            getDomain: this.getXDomain,
            setDomain: setXDomain,
          },
        }
  }

  onZoom = () => {
    const { main: mainAxis, secondary: secondaryAxis } = this.getAxis()
    const newZoom: number = d3.event.transform.k

    this.setState({ zoom: newZoom })

    const originalMainDomain = mainAxis.getDomain(this.getAllValues())
    const originalMainScale = mainAxis.getScale(originalMainDomain, mainAxis.size)
    const newMainScale = d3.event.transform[mainAxis.rescale](originalMainScale)
    const newMainDomain: NumberRange = newMainScale.domain()

    if (!_.isEqual(mainAxis.currentDomain, newMainDomain)) {
      mainAxis.setDomain(newMainDomain)
    }

    /**
     * Значения в домене не всегда идут от меньшего к большему: у вертикального
     * графика домен перевёрнут, чтобы 0 был наверху графика.
     */
    const domainMin = Math.min(...newMainDomain)
    const domainMax = Math.max(...newMainDomain)

    /**
     * Включаем в расчет домена значения из линий порогов только если зум
     * возвращается к стандартному значению.
     */
    const secondaryDomainValues = [
      ...this.getLines().map(item => item.values),
      ...(newZoom === 1 ? this.getThresholdLines() : []),
    ].filter(item => item.length)

    const newSecondaryDomain = calculateSecondaryDomain(
      domainMin,
      domainMax,
      secondaryDomainValues,
      mainAxis.getValue,
      secondaryAxis.getDomain
    )

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

  setHoveredMainValue = (newValue: HoveredMainValue) =>
    this.setState({ hoveredMainValue: newValue })
}
