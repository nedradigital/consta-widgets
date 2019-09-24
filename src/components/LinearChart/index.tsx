/* tslint:disable:readonly-array */
import React from 'react'
import { uid } from 'react-uid'

import * as d3 from 'd3'
import * as _ from 'lodash'

import css from './index.css'

type Item = { x: number; y: number }

type Props = {
  values: Item[]
}

type State = {
  xDomain: [number, number]
  yDomain: [number, number]
  zoom: number
  width: number
  height: number
  paddingX: number
  paddingY: number
}

const getIndexWithFallbackToDefault = (index: number, def: number): number =>
  index < 0 ? def : index

const getXDomain = (items: Item[]) => d3.extent(items, v => v.x) as [number, number]
const getYDomain = (items: Item[]) => d3.extent(items, v => v.y) as [number, number]

const getXScale = (domain: [number, number], width: number) =>
  d3
    .scaleLinear()
    .domain(domain)
    .range([0, width * (1 - LINE_PADDING_X)])

const ZOOM_TRANSITION_DURATION = 750
const MIN_ZOOM = 1
const MAX_ZOOM = 8
const DOT_RADIUS = 2.5
const LINE_PADDING_X = 0.06
const LINE_PADDING_Y = 0.055
const LINE_COLOR = '#20B55F'

export class LinearChart extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>()
  lineRef = React.createRef<SVGPathElement>()
  pointsRef = React.createRef<SVGGElement>()
  zoomRef = React.createRef<SVGRectElement>()
  xAxisRef = React.createRef<SVGGElement>()
  yAxisRef = React.createRef<SVGGElement>()
  xLabelsRef = React.createRef<SVGGElement>()
  yLabelsRef = React.createRef<SVGGElement>()
  xGridRef = React.createRef<SVGGElement>()
  yGridRef = React.createRef<SVGGElement>()

  // d3 ограничивает по 1 анимации на элемент, поэтому создаём фэйковые элементы для твинов стэйта
  paddingTransitionEl = {} as Element
  yDomainTransitionEl = {} as Element

  uid = uid(this)
  lineClipId = `line_clipPath_${this.uid}`
  pointsClipId = `points_clipPath_${this.uid}`

  state: State = {
    xDomain: getXDomain(this.props.values),
    yDomain: getYDomain(this.props.values),
    zoom: 1,
    width: 0,
    height: 0,
    paddingX: 0,
    paddingY: 0,
  }

  zoomBehavior?: d3.ZoomBehavior<Element, unknown>
  targetYDomain = this.state.yDomain
  targetPaddings = {
    paddingX: this.state.paddingX,
    paddingY: this.state.paddingY,
  }

  componentDidMount() {
    this.update()

    // TODO ResizeObserver, чтобы реагировать на ресайз бокса на дашборде
    window.addEventListener('resize', this.updateSize)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {
      props: { values },
      state: { zoom },
    } = this

    if (values !== prevProps.values) {
      this.setState({
        xDomain: getXDomain(values),
        yDomain: getYDomain(values),
      })
    }

    if (zoom !== prevState.zoom) {
      d3.select(this.zoomRef.current as Element)
        .transition()
        .duration(ZOOM_TRANSITION_DURATION)
        .call(this.zoomBehavior!.scaleTo, zoom)
    }

    this.update()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  getSvgSize = () => {
    const {
      state: { width, height, paddingX, paddingY },
    } = this

    return {
      svgWidth: Math.round(width - paddingX),
      svgHeight: Math.round(height - paddingY),
    }
  }

  render() {
    const {
      state: { zoom },
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()
    return (
      <div ref={this.ref} className={css.main}>
        <svg className={css.svg} width={svgWidth} height={svgHeight} color={LINE_COLOR}>
          <defs>
            <clipPath id={this.lineClipId}>
              <rect width={svgWidth} height={svgHeight} />
            </clipPath>
            <clipPath id={this.pointsClipId}>
              <rect
                width={svgWidth + 2 * DOT_RADIUS}
                height={svgHeight + 2 * DOT_RADIUS}
                x={-1 * DOT_RADIUS}
                y={-1 * DOT_RADIUS}
              />
            </clipPath>
          </defs>
          <g clipPath={`url(#${this.lineClipId})`}>
            <g className={css.axisLine} ref={this.xAxisRef} />
            <g className={css.axisLine} ref={this.yAxisRef} />
            <g className={css.grid} ref={this.xGridRef} />
            <g className={css.grid} ref={this.yGridRef} />
            <path ref={this.lineRef} className={css.line} />
          </g>
          <g
            className={css.labels}
            ref={this.xLabelsRef}
            style={{ transform: `translateY(${svgHeight}px)` }}
          />
          <g className={css.labels} ref={this.yLabelsRef} />
          <g ref={this.pointsRef} clipPath={`url(#${this.pointsClipId})`} />
          <rect ref={this.zoomRef} width={svgWidth} height={svgHeight} className={css.zoom} />
        </svg>

        <div className={css.buttons} style={{ marginTop: 30 }}>
          <button
            className={css.button}
            onClick={() => this.changeZoom(0.5)}
            disabled={zoom <= MIN_ZOOM}
          >
            −
          </button>
          <button
            className={css.button}
            onClick={() => this.changeZoom(2)}
            disabled={zoom >= MAX_ZOOM}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  update = () => {
    this.updateSize()
    this.updatePaddings()
    this.updateSvg()
  }

  updateSize = () => {
    const { width, height } = this.ref.current!.getBoundingClientRect()
    const newSize = { width, height }

    if (!_.isEqual(_.pick(this.state, ['width', 'height']), newSize)) {
      this.setState(newSize)
    }
  }

  updatePaddings = () => {
    const xLabelsHeight = this.xLabelsRef.current!.getBoundingClientRect().height
    const yLabelsWidth = this.yLabelsRef.current!.getBoundingClientRect().width

    const newPaddings = {
      paddingX: yLabelsWidth,
      paddingY: xLabelsHeight,
    }

    if (!_.isEqual(newPaddings, this.targetPaddings)) {
      this.targetPaddings = newPaddings

      const currentPaddings = _.pick(this.state, ['paddingX', 'paddingY'])

      if (!currentPaddings.paddingX || !currentPaddings.paddingY) {
        this.setState(newPaddings)
      } else {
        d3.select(this.paddingTransitionEl)
          .transition()
          .duration(600)
          .tween('paddings', () => {
            const i = d3.interpolateObject(currentPaddings, newPaddings)

            return (t: number) => {
              this.setState({ ...i(t) })
            }
          })
      }
    }
  }

  updateSvg = () => {
    const {
      props: { values },
      state: { xDomain, yDomain },
      xLabelsRef,
      yLabelsRef,
      lineRef,
    } = this
    const { svgWidth, svgHeight } = this.getSvgSize()

    const scaleX = getXScale(xDomain, svgWidth)
    const scaleY = d3
      .scaleLinear()
      .domain(yDomain)
      .range([
        // Чтобы нарисовался гридлайн на нижней оси
        svgHeight - 1,
        svgHeight * LINE_PADDING_Y,
      ])

    // Line
    const LineBackground = d3
      .line<Item>()
      .x(({ x }) => scaleX(x))
      .y(({ y }) => scaleY(y))
    d3.select(lineRef.current)
      .datum(values)
      .attr('d', LineBackground)

    // Labels
    d3.select(xLabelsRef.current!).call(
      d3
        .axisBottom(scaleX)
        .ticks(5)
        .tickSizeInner(4)
    )
    d3.select(yLabelsRef.current!).call(
      d3
        .axisLeft(scaleY)
        .ticks(5)
        .tickSizeInner(4)
    )

    // Axis lines
    d3.select(this.xAxisRef.current!).call(
      d3
        .axisBottom(scaleX)
        .tickValues([0])
        .tickSize(svgHeight)
        .tickFormat(() => '')
    )
    d3.select(this.yAxisRef.current!).call(
      d3
        .axisLeft(scaleY)
        .tickValues([0])
        .tickSize(-svgWidth)
        .tickFormat(() => '')
    )

    // Grid lines
    d3.select(this.xGridRef.current!).call(
      d3
        .axisBottom(scaleX)
        .ticks(5)
        .tickSize(svgHeight)
        .tickFormat(() => '')
    )
    d3.select(this.yGridRef.current!).call(
      d3
        .axisLeft(scaleY)
        .ticks(5)
        .tickSize(-svgWidth)
        .tickFormat(() => '')
    )

    // Line points
    d3.select(this.pointsRef.current)
      .selectAll('circle')
      .data(values)
      .join('circle')
      .attr('class', css.circle)
      .attr('cx', d => scaleX(d.x))
      .attr('cy', d => scaleY(d.y))
      .attr('r', DOT_RADIUS)

    // Zoom
    this.zoomBehavior = d3
      .zoom()
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .translateExtent([[0, 0], [svgWidth, svgHeight]])
      .extent([[0, 0], [svgWidth, svgHeight]])
      .on('zoom', this.onZoom)
    d3.select(this.zoomRef.current as Element)
      .call(this.zoomBehavior!)
      .on('wheel.zoom', null)
      .on('dblclick.zoom', null)
  }

  onZoom = () => {
    const {
      props: { values },
    } = this
    const { svgWidth } = this.getSvgSize()

    const originalXDomain = getXDomain(values)
    const originalScaleX = getXScale(originalXDomain, svgWidth)
    const newX = d3.event.transform.rescaleX(originalScaleX)
    const newXDomain = newX.domain()

    if (_.isEqual(this.state.xDomain, newXDomain)) {
      return
    }

    this.setState({ xDomain: newXDomain })

    const xRangeIndexes = [
      getIndexWithFallbackToDefault(_.findLastIndex(values, v => v.x <= newXDomain[0]), 0),
      getIndexWithFallbackToDefault(
        _.findIndex(values, v => v.x >= newXDomain[1]),
        values.length - 1
      ),
    ]
    const valuesToCalculateY = values.slice(xRangeIndexes[0], xRangeIndexes[1] + 1)
    const newYDomain = getYDomain(valuesToCalculateY)

    if (!_.isEqual(newYDomain, this.targetYDomain)) {
      this.targetYDomain = newYDomain

      d3.select(this.yDomainTransitionEl)
        .transition()
        .duration(ZOOM_TRANSITION_DURATION)
        .tween('yDomain', () => {
          const i = d3.interpolateArray(this.state.yDomain, newYDomain)

          return (t: number) => {
            // d3 внутри мутирует массив, поэтому клонируем
            this.setState({ yDomain: [...i(t)] as [number, number] })
          }
        })
    }
  }

  changeZoom = (modifier: number) => {
    this.setState(state => ({
      zoom: _.clamp(state.zoom * modifier, MIN_ZOOM, MAX_ZOOM),
    }))
  }
}
