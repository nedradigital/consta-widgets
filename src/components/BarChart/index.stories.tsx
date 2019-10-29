import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChart } from '.'

storiesOf('components/BarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => {
    return (
      <BarChart
        data={object('data', getWidgetMockData(DataType.BarChart).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.BarChart).colorGroups)}
        orientation="vertical"
        showValues={false}
        valuesTick={4}
      />
    )
  })
  .add('with undefined values', () => {
    return (
      <BarChart
        colorGroups={{
          first: '#56B9F2',
          second: '#EB5757',
          third: '#FCA355',
        }}
        data={[
          {
            label: 'март',
            values: [
              { value: undefined, colorGroupName: 'first' },
              { value: 600, colorGroupName: 'second' },
              { value: 270, colorGroupName: 'third' },
            ],
          },
          {
            label: 'апрель',
            values: [
              { value: 670, colorGroupName: 'first' },
              { value: 1000, colorGroupName: 'second' },
              { value: 1100, colorGroupName: 'third' },
            ],
          },
          {
            label: 'май',
            values: [
              { value: 1200, colorGroupName: 'first' },
              { value: 630, colorGroupName: 'second' },
              { value: undefined, colorGroupName: 'third' },
            ],
          },
        ]}
        orientation="vertical"
        showValues={false}
        valuesTick={4}
      />
    )
  })
