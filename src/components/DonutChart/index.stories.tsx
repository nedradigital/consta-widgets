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
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => {
    return (
      <DonutChart
        data={getWidgetMockData(DataType.Donut).data}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
        unit={text('unit', getWidgetMockData(DataType.Donut).unit)}
      />
    )
  })
  .add('with tooltip text', () => {
    return (
      <DonutChart
        data={[
          {
            name: 'План',
            colorGroupName: 'first',
            sections: [{ value: 3, tooltipText: '60' }],
          },
          {
            name: 'Факт',
            colorGroupName: 'second',
            sections: [{ value: 1, tooltipText: '15' }],
          },
        ]}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
        unit={text('unit', getWidgetMockData(DataType.Donut).unit)}
      />
    )
  })
