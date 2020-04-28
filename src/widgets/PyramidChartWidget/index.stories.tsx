import React from 'react'

import { array, boolean, object, select } from '@storybook/addon-knobs'

import { pyramidChartParams } from '@/dashboard/widget-params'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, PyramidChartWidget, PyramidChartWidgetContent } from '.'

export const Interactive = createStory(() => (
  <PyramidChartWidgetContent
    data={object('data', PyramidChartWidget.mockData)}
    params={{
      constraint: boolean('constraint', true),
      colors: array('colors', defaultParams.colors),
      fontSize: select('fontSize', pyramidChartParams.fontSizes, defaultParams.fontSize),
    }}
  />
))

export default createMetadata({
  title: 'widgets/PyramidChartWidgetContent',
  decorators: [blockCenteringDecorator({ width: '50vw', height: '50vh' })],
})
