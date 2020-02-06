import React from 'react'

import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Text } from '.'

storiesOf('ui/Text', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(
    blockCenteringDecorator({ backgroundColor: 'var(--bg-box)', padding: 20, width: 350 })
  )
  .add('interactive', () => (
    <Text size={select('size', sizes, sizes[0])}>{text('Text', 'Какой-то текст')}</Text>
  ))
  .add('с переносами на новую строку', () => (
    <Text size={select('size', sizes, sizes[0])}>
      {text(
        'Text',
        'Текст, который мы хотим перенести вот тут\nВот тут вот да и тут\nНу думаю смысл понятен'
      )}
    </Text>
  ))
  .add('с обрезанием текста', () => (
    <Text
      size={select('size', sizes, sizes[0])}
      croppedLineCount={number('croppedLineCount', 4)}
      croppedWithGradient={boolean('croppedWithGradient', false)}
    >
      {text(
        'Text',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      )}
    </Text>
  ))
