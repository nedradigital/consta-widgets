import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TrafficLightWidget, TrafficLightWidgetContent } from '.'

storiesOf('widgets/TrafficLightWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TrafficLightWidgetContent
      data={object('data', TrafficLightWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
