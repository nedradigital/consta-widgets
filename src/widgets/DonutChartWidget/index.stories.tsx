import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, DonutChartWidget, DonutChartWidgetContent } from '.'

storiesOf('widgets/DonutChartWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <DonutChartWidgetContent data={DonutChartWidget.mockData} params={defaultParams} />
  ))
