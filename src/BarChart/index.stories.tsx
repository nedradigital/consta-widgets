import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'

import { BarChart, orientation, Orientation, unitPositions } from '.'
import {
  barChartData,
  multiBarChartData,
  multiBarChartDataWithTwoColumnsOnDate,
  tornadoChartData,
} from './data.mock'
import { transformBarChartGroupsToCommonGroups } from './helpers'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')
const getOrientation = (defaultValue: Orientation) =>
  select('orientation', orientation, defaultValue)

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
        orientation={getOrientation('vertical')}
        groups={object('groups', multiBarChartData.groups)}
        unitPosition={getUnitPosition()}
        isMultiBar
        hasRatio={boolean('hasRatio', false)}
        showValues={boolean('showValues', false)}
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
        orientation={getOrientation('vertical')}
        groups={object('groups', multiBarChartDataWithTwoColumnsOnDate.groups)}
        unitPosition={getUnitPosition()}
        isMultiBar
        hasRatio={boolean('hasRatio', false)}
        showValues={boolean('showValues', false)}
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
        orientation={getOrientation('vertical')}
        unitPosition={getUnitPosition()}
        isMultiBar={false}
        showValues={boolean('showValues', true)}
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
        orientation={getOrientation('vertical')}
        unitPosition={getUnitPosition()}
        formatValueForLabel={value => {
          const date = new Date(value)

          return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
            .map(part => String(part).padStart(2, '0'))
            .join(':')
        }}
        showValues={boolean('showValues', false)}
        isMultiBar
      />
    )
  },
  { name: 'с форматированием значений' }
)

export const WithShowValuesOnTopBar = createStory(
  () => (
    <BarChart
      groups={object('groups', [
        {
          groupName: 'Q1',
          values: [{ apples: 100 }],
        },
        {
          groupName: 'Q2',
          values: [{ apples: 200 }],
        },
        {
          groupName: 'Q3',
          values: [{ apples: 300 }],
        },
      ])}
      colorGroups={multiBarChartData.colorGroups}
      {...defaultProps}
      orientation={getOrientation('vertical')}
      unitPosition={getUnitPosition()}
      isMultiBar={false}
      showValues={boolean('showValues', true)}
      size="auto"
    />
  ),
  { name: 'с подписью над столбцами' }
)

export const Minimalistic = createStory(
  () => (
    <BarChart
      {...multiBarChartData}
      groups={object('groups', multiBarChartData.groups)}
      orientation={getOrientation('horizontal')}
      gridTicks={0}
      valuesTicks={0}
      showValues={boolean('showValues', false)}
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
        showValues={boolean('showValues', true)}
        orientation={getOrientation('horizontal')}
      />
    )
  },
  { name: 'с отрицательными значениями' }
)

export const Tornado = createStory(
  () => (
    <BarChart
      {...tornadoChartData}
      groups={object('groups', tornadoChartData.groups)}
      gridTicks={4}
      valuesTicks={1}
      isMultiBar={false}
      size="m"
      showValues={boolean('showValues', true)}
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
