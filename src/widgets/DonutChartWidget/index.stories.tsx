import React from 'react'

import { object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, DonutChartWidget, DonutChartWidgetContent } from '.'

storiesOf('widgets/DonutChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', DonutChartWidget.mockData),
        formatValueForTooltip: v => `${v} ${text('unit', 'тыс м3')}`,
      }}
      params={object('params', defaultParams)}
    />
  ))
