import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { BarChart, unitPositions } from '.'
import { transformBarChartGroupsToCommonGroups } from './helpers'
import {
  barChartData,
  multiBarChartData,
  multiBarChartDataWithTwoColumnsOnDate,
  tornadoChartData,
} from './mockData'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

const defaultProps = {
  orientation: 'vertical',
  gridTicks: 4,
  valuesTicks: 1,
  unit: 'тыс м3',
} as const

export const SingleColumn = createStory(
  () => {
    return (
      <BarChart
        {...multiBarChartData}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        isMultiBar
        hasRatio={boolean('hasRatio', false)}
      />
    )
  },
  { name: 'с одним столбцом и несколькими значениями' }
)

export const TwoColumns = createStory(
  () => {
    return (
      <BarChart
        {...multiBarChartDataWithTwoColumnsOnDate}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        isMultiBar
        hasRatio={boolean('hasRatio', false)}
      />
    )
  },
  { name: 'с двумя столбцами и несколькими значениями' }
)

export const ThreeColumns = createStory(
  () => {
    return (
      <BarChart
        groups={object('data', transformBarChartGroupsToCommonGroups(barChartData.groups))}
        colorGroups={barChartData.colorGroups}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        isMultiBar={false}
        showValues
      />
    )
  },
  { name: 'с тремя столбцами и одним значением' }
)

export const WithFormatValue = createStory(
  () => {
    return (
      <BarChart
        groups={object('groups', [
          {
            groupName: 'Q1-2016',
            values: [{ apples: 24000000 }],
          },
          {
            groupName: 'Q2-2016',
            values: [{ apples: 30000000 }],
          },
          {
            groupName: 'Q3-2016',
            values: [{ apples: 36000000 }],
          },
        ])}
        colorGroups={multiBarChartData.colorGroups}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        formatValueForLabel={value => {
          const date = new Date(value)

          return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
            .map(part => String(part).padStart(2, '0'))
            .join(':')
        }}
        isMultiBar
      />
    )
  },
  { name: 'с форматированием значений' }
)

export const Minimalistic = createStory(
  () => (
    <BarChart
      {...multiBarChartData}
      orientation="horizontal"
      gridTicks={0}
      valuesTicks={0}
      isMultiBar
    />
  ),
  { name: 'минималистичный вид' }
)

export const WithNegativeValues = createStory(
  () => {
    return (
      <BarChart
        groups={object('groups', [
          {
            groupName: 'Q1-2016',
            values: [{ apples: 1000 }, { bananas: -100 }, { cherries: 50 }],
          },
          {
            groupName: 'Q2-2016',
            values: [{ apples: -1000 }, { bananas: undefined }, { cherries: 127 }],
          },
          {
            groupName: 'Q3-2016',
            values: [{ apples: 500 }, { bananas: 450 }, { cherries: undefined }],
          },
          {
            groupName: 'Q4-2016',
            values: [{ apples: undefined }, { bananas: -300 }, { cherries: -200 }],
          },
          {
            groupName: 'Q5-2016',
            values: [{ apples: 10 }, { bananas: 20 }, { cherries: 50 }],
          },
        ])}
        colorGroups={multiBarChartData.colorGroups}
        {...defaultProps}
        isMultiBar={false}
        showValues
        orientation="horizontal"
      />
    )
  },
  { name: 'с отрицательными значениями' }
)

export const Tornado = createStory(
  () => (
    <BarChart
      {...tornadoChartData}
      gridTicks={4}
      valuesTicks={1}
      isMultiBar={false}
      size="m"
      showValues
      isTornado
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  ),
  { name: 'торнадо' }
)

export default createMetadata({
  title: 'components/BarChart',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: '60vw', height: '80vh' })],
  excludeStories: ['DataWithTwoColumnsOnDate'],
})
