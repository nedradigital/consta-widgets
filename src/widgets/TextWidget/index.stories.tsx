import React from 'react'

import { number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TextWidgetContent, typeNames } from '.'

storiesOf('widgets/TextWidget', module)
  .addDecorator(
    blockCenteringDecorator({ backgroundColor: 'var(--bg-box)', padding: 20, width: 350 })
  )
  .add('interactive', () => (
    <TextWidgetContent
      data={{
        text: text('data', ''),
        tooltip: <p>Контент тултипа</p>,
      }}
      params={{
        text: text('title', defaultParams.text),
        type: select('type', typeNames, defaultParams.type),
        croppedLineCount: number('croppedLineCount', 0),
      }}
    />
  ))
