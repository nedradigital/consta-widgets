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
