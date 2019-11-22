import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, ImagesWidget, ImagesWidgetContent } from '.'

storiesOf('widgets/ImagesWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ImagesWidgetContent
      data={object('data', ImagesWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
