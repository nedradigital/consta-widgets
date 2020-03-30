import React from 'react'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { DEFAULT_COLORS, PyramidChart } from './index'

storiesOf('components/PyramidChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '50vw' }))
  .add('interactive', () => (
    <PyramidChart
      data={getWidgetMockData(DataType.Pyramid)}
      colors={DEFAULT_COLORS}
      constraint={boolean('constraint', true)}
      fontSize="m"
    />
  ))
