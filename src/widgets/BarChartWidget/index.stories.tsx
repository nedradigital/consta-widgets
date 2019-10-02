import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BarChartWidget, BarChartWidgetContent, defaultParams } from '.'

storiesOf('widgets/BarChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '80vh' }))
  .add('interactive', () => (
    <BarChartWidgetContent data={BarChartWidget.mockData} params={defaultParams} />
  ))
