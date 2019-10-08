import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChart } from '.'

storiesOf('components/BarChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => {
    return (
      <BarChart
        orientation="vertical"
        showValues={false}
        colors={{
          blue: '#56B9F2',
          red: '#EB5757',
          orange: '#FCA355',
        }}
        valuesTick={4}
        data={getWidgetMockData(DataType.BarChart)}
      />
    )
  })
