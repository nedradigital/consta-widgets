import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, MultiBarChartWidget, MultiBarChartWidgetContent } from '.'

storiesOf('widgets/MultiBarChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => (
    <MultiBarChartWidgetContent
      data={object('data', MultiBarChartWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
