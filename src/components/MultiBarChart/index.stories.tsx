import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { MultiBarChart } from '.'

storiesOf('components/MultiBarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => {
    return (
      <MultiBarChart
        orientation="vertical"
        valuesTick={4}
        hasRatio={false}
        data={object('data', getWidgetMockData(DataType.MultiBarChart))}
      />
    )
  })
