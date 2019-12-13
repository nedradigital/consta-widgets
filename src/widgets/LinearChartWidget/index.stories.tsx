import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { DataType } from '@/dashboard'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, LinearChartWidget, LinearChartWidgetContent } from '.'

storiesOf('widgets/LinearChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('interactive', () => (
    <LinearChartWidgetContent
      data={object('data', LinearChartWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
  .add('С полной датой в тултипе', () => (
    <LinearChartWidgetContent
      data={object('data', LinearChartWidget.mockData)}
      params={object('params', defaultParams)}
      dataset={{
        name: '',
        id: '',
        type: DataType.LinearChart,
        formatLabelForTooltip: (v: number) =>
          new Date(v)
            .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
            .replace('г.', ''),
      }}
    />
  ))
