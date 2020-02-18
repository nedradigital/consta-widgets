import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { unitPositions } from '@/components/BarChartAxis'
import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChart } from '.'

export const DataWithTwoColumnsOnDate = {
  categories: ['apples', 'bananas', 'cherries'],
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        { apples: 3840, bananas: 1920, cherries: 23 },
        { apples: 1840, bananas: 920, cherries: 230 },
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        { apples: 1600, bananas: 14, cherries: 45 },
        { apples: 600, bananas: 440, cherries: 450 },
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        { apples: 640, bananas: 960, cherries: 73 },
        { apples: 1640, bananas: 1960, cherries: 730 },
      ],
    },
  ],
}

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

const defaultProps = {
  orientation: 'vertical',
  gridTicks: 4,
  valuesTicks: 1,
  unit: 'тыс м3',
} as const

storiesOf('components/BarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('с одним столбцом и несколькими значениями', () => {
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
  })
  .add('с двумя столбцами и несколькими значениями', () => {
    return (
      <BarChart
        {...DataWithTwoColumnsOnDate}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        isMultiBar
        hasRatio={boolean('hasRatio', false)}
      />
    )
  })
  .add('с тремя столбцами и одним значением', () => {
    return (
      <BarChart
        {...getWidgetMockData(DataType.BarChart)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
        {...defaultProps}
        unitPosition={getUnitPosition()}
        isMultiBar={false}
      />
    )
  })
  .add('с форматированием значений', () => {
    return (
      <BarChart
        categories={object('categories', ['apples'])}
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
  })
  .add('минималистичный вид', () => (
    <BarChart
      {...getWidgetMockData(DataType.MultiBarChart)}
      colorGroups={object('colorGroups', getWidgetMockData(DataType.MultiBarChart).colorGroups)}
      orientation="horizontal"
      gridTicks={0}
      valuesTicks={0}
      isMultiBar
    />
  ))
  .add('с отрицательными значениями', () => {
    return (
      <BarChart
        categories={object('categories', ['apples', 'bananas', 'cherries'])}
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
  })
