import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Text } from '.'

storiesOf('ui/Text', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Text size={select('size', sizes, sizes[0])}>{text('Text', 'Какой-то текст')}</Text>
  ))
  .add('with text wrapping', () => (
    <Text size={select('size', sizes, sizes[0])}>
      {text(
        'Text',
        'Текст, который мы хотим перенести вот тут\nВот тут вот да и тут\nНу думаю смысл понятен'
      )}
    </Text>
  ))
