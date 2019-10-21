import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TextWidgetContent, typeNames } from '.'

storiesOf('widgets/TextWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TextWidgetContent
      data={text('data', null)}
      params={{
        text: text('title', defaultParams.text),
        type: select('type', typeNames, defaultParams.type),
      }}
    />
  ))
