import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { progressDonutData } from '@/components/DonutChart/index.stories'
import { blockCenteringDecorator, cubeMeterFormatValue } from '@/utils/Storybook'

import { defaultParams, DonutChartWidget, DonutChartWidgetContent } from '.'

const halfDonutData = {
  ...progressDonutData,
  halfDonut: 'right',
  textData: object('textData', {
    title: 'всего',
    value: '90',
    subTitle: 'МГРП',
    subValue: '20',
  }),
} as const

const formatValueForTooltip = cubeMeterFormatValue

storiesOf('widgets/DonutChartWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', DonutChartWidget.mockData),
        formatValueForTooltip,
      }}
      params={object('params', defaultParams)}
    />
  ))
  .add('Как полукруг с текстом', () => (
    <DonutChartWidgetContent
      data={{
        ...object('data', halfDonutData),
        formatValueForTooltip,
      }}
      params={object('params', defaultParams)}
    />
  ))
