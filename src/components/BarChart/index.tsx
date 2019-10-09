/* tslint:disable:readonly-array */
import * as React from 'react'
import { uid } from 'react-uid'

import * as d3 from 'd3'
import * as _ from 'lodash'

import { Axis } from './components/Axis'
import { Bar } from './components/Bar'
import css from './index.css'

type NumberRange = [number, number]

export type Orientation = 'horizontal' | 'vertical'

type Value = {
  value: number
  description: string
}

export type Data = {
  categorie: string
  values: Value[]
}

export type Colors = { [key in string]: string }

type Props = {
  data: Data[]
  colors: Colors
  orientation: Orientation
  /** Показывать значение рядом с линиями. Работает только при orientation: horizontal */
  showValues?: boolean
  valuesTick?: number
}

const defaultColumnSize = 12
const defaultColumnPadding = 4
const getXRange = (width: number) => [0, width] as NumberRange
const getYRange = (height: number) =>
  [
    // Чтобы нарисовался гридлайн на нижней оси
    height - 1,
    0,
  ] as NumberRange

const getGroupScale = (domain: string[], size: number, orientation: Orientation) =>
  d3
    .scaleBand()
    .domain(domain)
    .range(orientation === 'horizontal' ? getYRange(size) : getXRange(size))

const getValuesScale = (domain: NumberRange, size: number, orientation: Orientation) =>
  d3
    .scaleLinear()
    .domain(domain)
    .range(orientation === 'horizontal' ? getXRange(size) : getYRange(size))

const getComain = (items: Data[]): NumberRange => {
  const numbers = items.reduce(
    (acc, curr) => acc.concat(curr.values.map(i => i.value)),
    [] as number[]
  )
  return [0, d3.max(numbers)] as NumberRange
}

export class BarChart extends React.Component<Props> {
  ref = React.createRef<HTMLDivElement>()

  resizeObserver = new ResizeObserver(() => this.updateSize())

  uid = uid(this)
  clipId = `barchart_clipPath_${this.uid}`

  state = {
    width: 0,
    height: 0,
    paddingX: 0,
    paddingY: 0,
  }

  targetPaddings = {
    paddingX: this.state.paddingX,
    paddingY: this.state.paddingY,
  }

  componentDidMount() {
    this.updateSize()

    this.resizeObserver.observe(this.ref.current!)
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.ref.current!)
  }

  render() {
    const { data = [], orientation, colors, showValues, valuesTick = 4 } = this.props
    const { svgWidth, svgHeight } = this.getSvgSize()

    const groupDomains = data.map(item => item.categorie)
    const valuesDomains = getComain(data)
    const barDomains = data.length ? data[0].values.map(item => item.description) : []

    const barSize =
      (defaultColumnSize + defaultColumnPadding) * (data.length ? data[0].values.length : 0)

    const groupScale = getGroupScale(
      groupDomains,
      orientation === 'horizontal' ? svgHeight : svgWidth,
      orientation
    )
    const valuesScale = getValuesScale(
      valuesDomains,
      orientation === 'horizontal' ? svgWidth : svgHeight,
      orientation
    )
    const barScale = getGroupScale(barDomains, barSize, orientation)

    return (
      <div ref={this.ref} className={css.main}>
        <svg className={css.svg} width={svgWidth} height={svgHeight}>
          <defs>
            <clipPath id={this.clipId}>
              <rect width={svgWidth} height={svgHeight} />
            </clipPath>
          </defs>
          <Axis
            width={svgWidth}
            height={svgHeight}
            groupScale={groupScale}
            valuesScale={valuesScale}
            valuesTick={valuesTick}
            orientation={orientation}
            onAxisSizeChange={this.onAxisSizeChange}
          />
          {data.map(item => (
            <Bar
              key={item.categorie}
              orientation={orientation}
              data={item}
              groupScale={groupScale}
              valuesScale={valuesScale}
              barScale={barScale}
              barSize={barSize}
              colors={colors}
              clipId={this.clipId}
              columnSize={defaultColumnSize}
              padding={defaultColumnPadding}
              showValues={showValues}
            />
          ))}
        </svg>
      </div>
    )
  }

  updateSize = () => {
    if (this.ref.current) {
      const { width, height } = this.ref.current.getBoundingClientRect()
      const newSize = { width, height }

      if (!_.isEqual(_.pick(this.state, ['width', 'height']), newSize)) {
        this.setState(newSize)
      }
    }
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

  onAxisSizeChange = ({ xAxisHeight, yAxisWidth }: { xAxisHeight: number; yAxisWidth: number }) => {
    const newPaddings = {
      paddingX: yAxisWidth,
      paddingY: xAxisHeight,
    }

    if (!_.isEqual(newPaddings, this.targetPaddings)) {
      this.targetPaddings = newPaddings

      this.setState(newPaddings)
    }
  }
}
