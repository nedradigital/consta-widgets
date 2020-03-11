import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'
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
        croppedWithGradient: boolean('croppedWithGradient', false),
      }}
    />
  ))
  .add('с обработчиком для кнопки', () => (
    <TextWidgetContent
      data={{
        text: text('data', ''),
        onClick: action('Клик по кнопке'),
      }}
      params={{
        text: text('title', defaultParams.text),
        type: select('type', typeNames, defaultParams.type),
        croppedLineCount: number('croppedLineCount', 0),
        croppedWithGradient: boolean('croppedWithGradient', false),
      }}
    />
  ))
  .add('с переносами', () => (
    <TextWidgetContent
      data={{ text: '' }}
      params={{
        text: text(
          'text',
          'Текст, который мы хотим перенести вот тут\nВот тут вот да и тут\nНу думаю смысл понятен'
        ),
        type: select('type', typeNames, defaultParams.type),
        croppedLineCount: 0,
        croppedWithGradient: false,
      }}
    />
  ))
  .add('обрезанный градиентом', () => (
    <TextWidgetContent
      data={{ text: '' }}
      params={{
        text: text(
          'text',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        ),
        type: select('type', typeNames, defaultParams.type),
        croppedLineCount: number('croppedLineCount', 4),
        croppedWithGradient: boolean('croppedWithGradient', true),
      }}
    />
  ))
