import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TitleWidgetContent } from '.'

storiesOf('widgets/TitleWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TitleWidgetContent data={undefined} params={object('params', defaultParams)} />
  ))
