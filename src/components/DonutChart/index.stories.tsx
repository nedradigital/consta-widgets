import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, cubeMeterFormatValue, emptyFormatValue } from '@/utils/Storybook'

import { DonutChart } from '.'

const dataItemWithoutData = {
  data: {
    name: 'Неизвестный бур',
    colorGroupName: 'forth',
    sections: [{ value: null }, { value: null }, { value: null }],
  },
  colorGroup: {
    forth: 'var(--color-bg-alert)',
  },
}

export const progressDonutData = {
  data: [
    {
      name: 'План',
      colorGroupName: 'plan',
      sections: [{ value: 3, showValue: 60 }],
    },
    {
      name: 'Факт',
      colorGroupName: 'fact',
      sections: [{ value: 1, showValue: 15 }],
    },
  ],
  colorGroups: {
    plan: 'var(--color-bg-border)',
    fact: 'var(--color-bg-warning)',
  },
}

storiesOf('components/DonutChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(
    blockCenteringDecorator({
      backgroundColor: 'var(--color-control-bg-default)',
      width: 200,
      height: 200,
    })
  )
  .add('interactive', () => {
    return (
      <DonutChart
        data={object('data', getWidgetMockData(DataType.Donut).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  })
  .add('без данных по одной группе в одном круге', () => {
    return (
      <DonutChart
        data={object('data', [
          ...getWidgetMockData(DataType.Donut).data,
          { ...dataItemWithoutData.data, sections: [{ value: null }, { value: 3 }, { value: 8 }] },
        ])}
        colorGroups={object('colorGroups', {
          ...getWidgetMockData(DataType.Donut).colorGroups,
          ...dataItemWithoutData.colorGroup,
        })}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  })
  .add('без данных по одной группе целиком', () => {
    return (
      <DonutChart
        data={object('data', [
          ...getWidgetMockData(DataType.Donut).data,
          { ...dataItemWithoutData.data },
        ])}
        colorGroups={object('colorGroups', {
          ...getWidgetMockData(DataType.Donut).colorGroups,
          ...dataItemWithoutData.colorGroup,
        })}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  })
  .add('Как прогресс бар', () => {
    return (
      <DonutChart
        data={object('data', progressDonutData.data)}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
      />
    )
  })
  .add('Как прогресс бар без данных по факту', () => {
    return (
      <DonutChart
        data={object('data', [
          progressDonutData.data[0],
          { ...progressDonutData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={progressDonutData.colorGroups}
        formatValueForTooltip={emptyFormatValue}
      />
    )
  })
  .add('Как полукруг с текстом', () => {
    return (
      <DonutChart
        data={object('data', progressDonutData.data)}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
        halfDonut="right"
        textData={object('textData', {
          title: 'всего',
          value: '90',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  })
  .add('Как полукруг с текстом без данных по факту', () => {
    return (
      <DonutChart
        data={object('data', [
          progressDonutData.data[0],
          { ...progressDonutData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={progressDonutData.colorGroups}
        formatValueForTooltip={emptyFormatValue}
        halfDonut="right"
        textData={object('textData', {
          title: 'всего',
          value: '90',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  })
