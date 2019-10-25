import React from 'react'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { PyramidChart } from './index'

storiesOf('components/PyramidChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '50vw', height: '50vh' } as React.CSSProperties))
  .add('interactive', () => (
    <PyramidChart
      data={getWidgetMockData(DataType.Pyramid)}
      colors={['#FC4449', '#FF6D32', '#FF9724', '#F7CC1D', '#59D72C', '#00BD59']}
      constraint={boolean('constraint', true)}
      fontSize="m"
    />
  ))
