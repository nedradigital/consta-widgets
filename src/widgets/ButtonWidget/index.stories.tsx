import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ButtonWidget, ButtonWidgetContent, defaultParams } from './'

storiesOf('widgets/ButtonWidget', module)
  .addDecorator(blockCenteringDecorator({ width: 200, height: 200 }))
  .add('interactive', () => (
    <ButtonWidgetContent
      data={object('data', ButtonWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
