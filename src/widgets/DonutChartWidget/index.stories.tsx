import React from 'react'

import { object } from '@storybook/addon-knobs'

import { progressDonutData } from '@/components/DonutChart/index.stories'
import {
  blockCenteringDecorator,
  createMetadata,
  createStory,
  cubeMeterFormatValue,
} from '@/utils/Storybook'

import { defaultParams, DonutChartWidget, DonutChartWidgetContent } from '.'

const halfDonutData = {
  ...progressDonutData,
  textData: {
    title: 'всего',
    value: '90',
    subTitle: 'МГРП',
    subValue: '20',
  },
} as const

const formatValueForTooltip = cubeMeterFormatValue

export const Interactive = createStory(() => (
  <DonutChartWidgetContent
    data={{
      ...object('data', DonutChartWidget.mockData),
      formatValueForTooltip,
    }}
    params={object('params', defaultParams)}
  />
))

export const HalfDonut = createStory(
  () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', halfDonutData),
        formatValueForTooltip,
      }}
      params={object('params', {
        ...defaultParams,
        halfDonut: 'right',
      })}
    />
  ),
  { name: 'Как полукруг с текстом' }
)

export default createMetadata({
  title: 'widgets/DonutChartWidget',
  decorators: [blockCenteringDecorator({ width: 200, height: 200 })],
})
