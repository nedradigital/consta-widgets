import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, PyramidChartWidget, PyramidChartWidgetContent } from '.'

storiesOf('widgets/PyramidChartWidgetContent', module)
  .addDecorator(blockCenteringDecorator({ width: '50vw', height: '50vh' }))
  .add('interactive', () => (
    <PyramidChartWidgetContent
      data={object('data', PyramidChartWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
