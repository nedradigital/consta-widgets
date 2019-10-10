import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, LegendWidgetContent } from '.'

storiesOf('widgets/LegendWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <LegendWidgetContent data={undefined} params={object('params', defaultParams)} />
  ))
