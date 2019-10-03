import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { DonutChart } from '.'

storiesOf('components/DonutChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => {
    return (
      <DonutChart
        colors={{
          red: '#EB5757',
          yellow: '#F2C94C',
          blue: '#56B9F2',
        }}
        data={getWidgetMockData(DataType.Donut)}
      />
    )
  })
