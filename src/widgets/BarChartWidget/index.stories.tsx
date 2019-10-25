import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChartWidget, BarChartWidgetContent, defaultParams } from '.'

storiesOf('widgets/BarChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => (
    <BarChartWidgetContent
      data={object('data', BarChartWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
