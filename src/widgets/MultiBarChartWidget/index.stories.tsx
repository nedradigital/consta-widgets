import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { DataWithTwoColumnsOnDate } from '@/components/MultiBarChart/index.stories'
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
  .add('interactive/2 columns', () => (
    <MultiBarChartWidgetContent
      data={object('data', {
        colorGroups: {
          apples: '#56B9F2',
          bananas: '#EB5757',
          cherries: '#FCA355',
          year: 'aquamarine',
        },
        data: DataWithTwoColumnsOnDate,
        unit: 'тыс м3',
      })}
      params={object('params', defaultParams)}
    />
  ))
