import React from 'react'

import { array, boolean, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { pyramidChartParams } from '@/dashboard/widget-params'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, PyramidChartWidget, PyramidChartWidgetContent } from '.'

storiesOf('widgets/PyramidChartWidgetContent', module)
  .addDecorator(blockCenteringDecorator({ width: '50vw', height: '50vh' }))
  .add('interactive', () => (
    <PyramidChartWidgetContent
      data={object('data', PyramidChartWidget.mockData)}
      params={{
        constraint: boolean('constraint', true),
        colors: array('colors', defaultParams.colors),
        fontSize: select('fontSize', pyramidChartParams.fontSizes, defaultParams.fontSize),
      }}
    />
  ))
