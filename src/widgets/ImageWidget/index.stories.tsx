import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, ImageWidget, ImageWidgetContent } from '.'

storiesOf('widgets/ImageWidget', module)
  .addDecorator(
    blockCenteringDecorator({
      width: '600px',
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
  )
  .add('interactive', () => (
    <ImageWidgetContent
      data={object('data', ImageWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
