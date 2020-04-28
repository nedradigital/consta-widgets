import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { barChartParams } from '@/dashboard/widget-params'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { BarChart } from '.'
import { transformBarChartGroupsToCommonGroups } from './helpers'

export const DataWithTwoColumnsOnDate = {
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        { apples: 3840, bananas: 1920 },
        { cherries: 230, melon: 500 },
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        { apples: 1600, bananas: 150 },
        { cherries: 450, melon: 350 },
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        { apples: 640, bananas: 960 },
        { cherries: 730, melon: 120 },
      ],
    },
  ],
}

const getUnitPosition = () => select('unitPosition', barChartParams.unitPositions, 'none')

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
        {...getWidgetMockData(DataType.MultiBarChart)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
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
        {...DataWithTwoColumnsOnDate}
        colorGroups={object('colorGroups', {
          apples: 'var(--color-bg-normal)',
          bananas: 'var(--color-bg-alert)',
          cherries: 'var(--color-bg-warning)',
          melon: 'var(--color-bg-success)',
        })}
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
        groups={object(
          'data',
          transformBarChartGroupsToCommonGroups(getWidgetMockData(DataType.BarChart).groups)
        )}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
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
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
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
      {...getWidgetMockData(DataType.MultiBarChart)}
      colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
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
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
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
      groups={[
        {
          groupName: 'АО Мессояханефтегаз',
          values: [{ first: 10 }, { second: 6 }],
        },
        {
          groupName: 'ООО ГПН-Оренбург',
          values: [{ first: 6 }, { second: 3 }],
        },
        {
          groupName: 'ООО ГПН-Заполярьег',
          values: [{ first: 4 }, { second: 3 }],
        },
        {
          groupName: 'ООО ГПН-Ямал',
          values: [{ first: 1 }, { second: 2 }],
        },
        {
          groupName: 'ООО ГПН-Восток',
          values: [{ first: 7 }, { second: 13 }],
        },
        {
          groupName: 'ООО Газпром-инвест',
          values: [{ first: 4 }, { second: 12 }],
        },
      ]}
      colorGroups={{
        first: 'var(--color-bg-normal)',
        second: 'var(--color-bg-alert)',
      }}
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
