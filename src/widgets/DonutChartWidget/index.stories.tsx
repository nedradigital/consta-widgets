import React from 'react'

import { storiesOf } from '@storybook/react'

import { DataType } from '@/dashboard/types'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, DonutChartWidgetContent } from '.'

storiesOf('widgets/DonutChartWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <DonutChartWidgetContent data={getWidgetMockData(DataType.Donut)} params={defaultParams} />
  ))
