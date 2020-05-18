import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, LinearChartWidget, LinearChartWidgetContent } from '.'

export const Interactive = createStory(() => (
  <LinearChartWidgetContent
    data={object('data', LinearChartWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export const WithFormatValueForTooltip = createStory(
  () => (
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
  ),
  {
    name: 'с полной датой в тултипе',
  }
)

export default createMetadata({
  title: 'widgets/LinearChartWidget',
  decorators: [blockCenteringDecorator({ width: '60vw', height: '50vh' })],
})
