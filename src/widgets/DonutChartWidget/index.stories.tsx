import React from 'react'

import { object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { FormatValue } from '@/dashboard/types'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, DonutChartWidget, DonutChartWidgetContent } from '.'

const halfDonutData = {
  data: [
    {
      name: 'Факт',
      colorGroupName: 'fact',
      sections: [{ value: 1, showValue: 15 }],
    },
    {
      name: 'План',
      colorGroupName: 'plan',
      sections: [{ value: 3, showValue: 60 }],
    },
  ],
  colorGroups: {
    fact: '#F38B00',
    plan: 'rgba(86, 185, 242, 1)',
  },
  halfDonut: 'right',
  textData: object('textData', {
    title: 'всего',
    value: '90',
    subTitle: 'МГРП',
    subValue: '20',
  }),
} as const

const formatValueForTooltip: FormatValue = v => `${v} ${text('unit', 'тыс м3')}`

storiesOf('widgets/DonutChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', DonutChartWidget.mockData),
        formatValueForTooltip,
      }}
      params={object('params', defaultParams)}
    />
  ))
  .add('Как полукруг с текстом', () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', halfDonutData),
        formatValueForTooltip,
      }}
      params={object('params', defaultParams)}
    />
  ))
