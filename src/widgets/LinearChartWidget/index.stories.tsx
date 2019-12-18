import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

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
      data={{
        ...object('data', LinearChartWidget.mockData),
        formatValueForTooltipTitle: v => {
          const title = new Date(v)
            .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
            .replace('г.', '')

          return title[0].toUpperCase() + title.slice(1)
        },
      }}
      params={object('params', defaultParams)}
    />
  ))
