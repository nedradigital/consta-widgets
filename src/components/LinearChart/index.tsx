import React from 'react'
import { uid } from 'react-uid'

import { isNotNil } from '@gaz/utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { Axis, GridConfig } from '@/components/LinearChart/components/Axis'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { HoverLines } from './components/HoverLines'
import { LineTooltip } from './components/LineTooltip'
import { LineWithDots as LineComponent } from './components/LineWithDots'
import { Threshold } from './components/Threshold'
import { Zoom } from './components/Zoom'
import css from './index.css'

export type Item = { x: number | null; y: number | null }
export type NotEmptyItem = { x: number; y: number }
export const itemIsNotEmpty = (item: Item): item is NotEmptyItem =>
  isNotNil(item.x) && isNotNil(item.y)

export type Threshold = {
  max: readonly NotEmptyItem[]
  min?: readonly NotEmptyItem[]
}

export type Line = {
  colorGroupName: string
  values: readonly Item[]
  dots?: boolean
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
  isHorizontal?: boolean
  formatValueForLabel: FormatValue
  formatValueForTooltip?: FormatValue
  formatValueForTooltipTitle?: FormatValue
  colorGroups: ColorGroups
  unit?: string
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

const INITIAL_DOMAIN = [Number.MIN_VALUE, Number.MAX_VALUE] as const

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

const getIndexWithFallbackToDefault = (index: number, def: number): number =>
  index < 0 ? def : index

export const padDomain = (
  domain: NumberRange,
  paddingStart: number,
  paddingEnd: number,
  zoom: number
): NumberRange => {
  const [start, end] = domain
  const diff = domain[1] - domain[0]
  const delta = diff === 0 ? domain[0] : diff

  return [start - paddingStart * delta * (1 / zoom), end + paddingEnd * delta * (1 / zoom)]
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

export const calculateSecondaryDomain = (
  mainDomainMin: number,
  mainDomainMax: number,
  linesValues: ReadonlyArray<readonly Item[]>,
  getValue: (v: NotEmptyItem) => number,
  getDomain: (items: readonly NotEmptyItem[]) => NumberRange
) => {
  const lineDomains = linesValues.map(values => {
    const zoomRangeIndexes = _.sortBy([
      getIndexWithFallbackToDefault(
        _.findLastIndex(values, v => itemIsNotEmpty(v) && getValue(v) <= mainDomainMin),
        0
      ),
      getIndexWithFallbackToDefault(
        _.findIndex(values, v => itemIsNotEmpty(v) && getValue(v) >= mainDomainMax),
        values.length - 1
      ),
    ])

    const valuesInZoomRange = values
      .slice(zoomRangeIndexes[0], zoomRangeIndexes[1] + 1)
      .filter(itemIsNotEmpty)

    return valuesInZoomRange.length ? getDomain(valuesInZoomRange) : [0, 0]
  })

  return [
    Math.min(...lineDomains.map(d => d[0])),
    Math.max(...lineDomains.map(d => d[1])),
  ] as NumberRange
}

export const getUniqValues = (
  items: readonly Item[],
  domain: NumberRange,
  type: 'x' | 'y',
  isHorizontal?: boolean
): readonly number[] =>
  _.sortBy(
    _.uniq(items.map(v => v[type]))
      .filter(isNotNil)
      .filter(i =>
        isHorizontal ? i >= domain[0] && i <= domain[1] : i >= domain[1] && i <= domain[0]
      )
  )

export const getMainTickValues = ({
  items,
  domain,
  gridConfig,
  tickType,
  guideValue,
  isHorizontal,
}: {
  items: readonly Item[]
  domain: NumberRange
  gridConfig: GridConfig
  tickType: 'labelTicks' | 'gridTicks'
  guideValue: number
  isHorizontal?: boolean
}): TickValues => {
  if (domain === INITIAL_DOMAIN) {
    return []
  }

  const config = gridConfig[isHorizontal ? 'x' : 'y']
  const uniqValues = getUniqValues(items, domain, isHorizontal ? 'x' : 'y', isHorizontal)
  const ticks = config[tickType] || 0
  const isGuide = tickType === 'gridTicks' && config.guide && domain[0] <= guideValue
  const result =
    ticks === 0 ? [] : _.chunk(uniqValues, Math.ceil(uniqValues.length / ticks)).map(arr => arr[0])

  if (result.length === 2 || (tickType === 'labelTicks' && [1, 2].includes(ticks))) {
    return _.uniq([uniqValues[0], uniqValues[uniqValues.length - 1]])
  }

  return _.uniq(result.concat(isGuide ? [guideValue] : []))
}

export const getSecondaryTickValues = ({
  items,
  domain,
  gridConfig,
  tickType,
  guideValue,
  isHorizontal,
}: {
  items: readonly Item[]
  domain: NumberRange
  gridConfig: GridConfig
  tickType: 'labelTicks' | 'gridTicks'
  guideValue: number
  isHorizontal?: boolean
}) => {
  if (domain === INITIAL_DOMAIN) {
    return []
  }

  const config = gridConfig[isHorizontal ? 'y' : 'x']
  const uniqValues = getUniqValues(items, domain, isHorizontal ? 'y' : 'x', true)
  const ticks = config[tickType] || 0
  const isGuide = tickType === 'gridTicks' && config.guide && domain[0] <= guideValue
  const result = ticks === 0 ? [] : d3.ticks(domain[0], domain[1], ticks)

  if (result.length === 2 || (tickType === 'labelTicks' && [1, 2].includes(ticks))) {
    return _.uniq([uniqValues[0], uniqValues[uniqValues.length - 1]])
  }

  return _.uniq(result.concat(isGuide ? [guideValue] : []))
}

function flipPointsOnAxes<T extends Item | NotEmptyItem>(
  items: readonly T[],
  isHorizontal?: boolean
): readonly T[] {
  return isHorizontal
    ? items
    : items.map(
        item =>
          ({
            x: item.y,
            y: item.x,
          } as T)
      )
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
        threshold,
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
          isHorizontal={!!isHorizontal}
          scaleX={scaleX}
          scaleY={scaleY}
          colorGroups={colorGroups}
          hoveredMainValue={hoveredMainValue}
          anchorEl={this.svgWrapperRef.current}
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
            isHorizontal={Boolean(isHorizontal)}
            hoveredMainValue={hoveredMainValue}
            onChangeHoveredMainValue={this.setHoveredMainValue}
          />

          {threshold && (
            <Threshold
              scaleX={scaleX}
              scaleY={scaleY}
              maxPoints={flipPointsOnAxes(threshold.max, isHorizontal)}
              minPoints={threshold.min ? flipPointsOnAxes(threshold.min, isHorizontal) : undefined}
              clipPath={lineClipPath}
            />
          )}

          {this.getLines().map(line => (
            <LineComponent
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
              isHorizontal={Boolean(isHorizontal)}
            />
          ))}
        </svg>

        {withZoom && (
          <Zoom
            isHorizontal={Boolean(isHorizontal)}
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

    const { max, min = [] } = threshold

    return [flipPointsOnAxes(max, isHorizontal), flipPointsOnAxes(min, isHorizontal)]
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
