import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, StatsWidget, StatsWidgetContent } from '.'

storiesOf('widgets/StatsWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <StatsWidgetContent
      data={object('data', StatsWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
