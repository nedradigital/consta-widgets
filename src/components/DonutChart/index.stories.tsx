import React from 'react'

import { object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { DonutChart } from '.'

storiesOf('components/DonutChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(
    blockCenteringDecorator({
      backgroundColor: 'var(--bg-box)',
      width: 200,
      height: 200,
    })
  )
  .add('interactive', () => {
    return (
      <DonutChart
        data={getWidgetMockData(DataType.Donut).data}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
        formatValueForTooltip={v => `${v}${text('unit', ' тыс м3')}`}
      />
    )
  })
  .add('Как прогресс бар', () => {
    return (
      <DonutChart
        data={[
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
        ]}
        colorGroups={{
          fact: '#F38B00',
          plan: 'rgba(86, 185, 242, 0.19)',
        }}
        formatValueForTooltip={v => `${v}${text('unit', '')}`}
      />
    )
  })
  .add('Как полукруг с текстом', () => {
    return (
      <DonutChart
        data={[
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
        ]}
        colorGroups={{
          fact: '#F38B00',
          plan: 'rgba(86, 185, 242, 1)',
        }}
        formatValueForTooltip={v => `${v}${text('unit', '')}`}
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
