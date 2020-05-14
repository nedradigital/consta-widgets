import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TornadoChartContent, TornadoChartWidget } from '.'

storiesOf('widgets/TornadoChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => (
    <TornadoChartContent
      data={object('data', TornadoChartWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
