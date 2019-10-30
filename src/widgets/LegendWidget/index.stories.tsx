import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, LegendWidget, LegendWidgetContent } from '.'

storiesOf('widgets/LegendWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <LegendWidgetContent data={LegendWidget.mockData} params={object('params', defaultParams)} />
  ))
