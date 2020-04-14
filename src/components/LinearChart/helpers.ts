import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { Item, itemIsNotEmpty, NotEmptyItem, NumberRange, TickValues } from './'
import { GridConfig } from './components/Axis'

export const INITIAL_DOMAIN = [Number.MIN_VALUE, Number.MAX_VALUE] as const

export const getIndexWithFallbackToDefault = (index: number, def: number): number =>
  index < 0 ? def : index

export const padDomain = ({
  domain,
  paddingStart,
  paddingEnd,
  zoom,
}: {
  domain: NumberRange
  paddingStart: number
  paddingEnd: number
  zoom: number
}): NumberRange => {
  const [start, end] = domain
  const diff = domain[1] - domain[0]
  const delta = diff === 0 ? domain[0] : diff

  return [start - paddingStart * delta * (1 / zoom), end + paddingEnd * delta * (1 / zoom)]
}

export const getXRange = (width: number) => [0, width] as NumberRange
export const getYRange = (height: number) =>
  [
    // Чтобы нарисовался гридлайн на нижней оси
    height - 1,
    0,
  ] as NumberRange

export const getXScale = (domain: NumberRange, width: number) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(getXRange(width))

export const getYScale = (domain: NumberRange, height: number) =>
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
  type: 'x' | 'y'
): readonly number[] => {
  const minInDomain = Math.min(...domain)
  const maxInDomain = Math.max(...domain)

  return _.sortBy(
    _.uniq(items.map(v => v[type]))
      .filter(isNotNil)
      .filter(i => i >= minInDomain && i <= maxInDomain)
  )
}

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
  const uniqValues = getUniqValues(items, domain, isHorizontal ? 'x' : 'y')
  const ticks = config[tickType] || 0
  const isGuide = tickType === 'gridTicks' && config.guide && domain[0] <= guideValue
  const result = d3.ticks(Math.min(...domain), Math.max(...domain), ticks).filter(Number.isInteger)

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
  const uniqValues = getUniqValues(items, domain, isHorizontal ? 'y' : 'x')
  const ticks = config[tickType] || 0
  const isGuide = tickType === 'gridTicks' && config.guide && domain[0] <= guideValue
  const result = ticks === 0 ? [] : d3.ticks(domain[0], domain[1], ticks)

  if (result.length === 2 || (tickType === 'labelTicks' && [1, 2].includes(ticks))) {
    return _.uniq([uniqValues[0], uniqValues[uniqValues.length - 1]])
  }

  return _.uniq(result.concat(isGuide ? [guideValue] : []))
}

export function flipPointsOnAxes<T extends Item | NotEmptyItem>(
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
