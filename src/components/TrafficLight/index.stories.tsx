import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { TrafficLight } from './index'

storiesOf('components/TrafficLight', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TrafficLight
      type="default"
      size="s"
      data={object('data', getWidgetMockData(DataType.TrafficLight))}
    />
  ))
