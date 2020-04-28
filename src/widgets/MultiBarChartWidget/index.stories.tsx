import React from 'react'

import { object } from '@storybook/addon-knobs'

import { DataWithTwoColumnsOnDate } from '@/components/BarChart/index.stories'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, MultiBarChartWidget, MultiBarChartWidgetContent } from '.'

export const Interactive = createStory(() => (
  <MultiBarChartWidgetContent
    data={object('data', MultiBarChartWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export const InteractiveWithTwoColumns = createStory(
  () => (
    <MultiBarChartWidgetContent
      data={object('data', {
        colorGroups: {
          apples: 'var(--color-bg-normal)',
          bananas: 'var(--color-bg-alert)',
          cherries: 'var(--color-bg-warning)',
          year: 'var(--color-bg-success)',
        },
        ...DataWithTwoColumnsOnDate,
        unit: 'тыс м3',
      })}
      params={object('params', defaultParams)}
    />
  ),
  { name: 'с 2 колонками' }
)

export default createMetadata({
  title: 'widgets/MultiBarChartWidget',
  decorators: [blockCenteringDecorator({ width: '60vw', height: '80vh' })],
})
