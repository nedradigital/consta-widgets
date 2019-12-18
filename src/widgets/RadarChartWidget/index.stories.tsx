import React from 'react'

import { object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, RadarChartWidget, RadarChartWidgetContent } from '.'

storiesOf('widgets/RadarChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '80vw', height: '80vh' }))
  .add('interactive', () => (
    <RadarChartWidgetContent
      data={{
        ...object('data', RadarChartWidget.mockData),
        formatValueForTooltip: v => `${v} ${text('unit', 'тыс м3')}`,
      }}
      params={object('params', defaultParams)}
    />
  ))
