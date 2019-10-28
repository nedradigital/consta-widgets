import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, ProgressBarWidget, ProgressBarWidgetContent } from './'

storiesOf('widgets/ProgressBarWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('interactive', () => (
    <ProgressBarWidgetContent
      data={object('data', ProgressBarWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
