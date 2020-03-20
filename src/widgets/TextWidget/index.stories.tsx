import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import {
  defaultParams,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  textAligns,
  textSpacings,
  TextWidgetContent,
  typeNames,
} from '.'

storiesOf('widgets/TextWidget', module)
  .addDecorator(
    blockCenteringDecorator({ backgroundColor: 'var(--bg-box)', padding: 20, width: 350 })
  )
  .add('стандартный режим', () => (
    <TextWidgetContent
      data={{
        text: text('data', ''),
        tooltip: <p>Контент тултипа</p>,
      }}
      params={{
        type: select('type', typeNames, defaultParams.type),
        text: text('text', defaultParams.text),
        croppedLineCount: number('croppedLineCount', 0),
        croppedWithGradient: boolean('croppedWithGradient', false),
      }}
    />
  ))
  .add('расширенный режим', () => (
    <TextWidgetContent
      data={{
        text: text('data', defaultParams.text),
        tooltip: <p>Контент тултипа</p>,
      }}
      params={{
        type: 'advanced',
        text: text('text', defaultParams.text),
        croppedLineCount: number('croppedLineCount', 0),
        croppedWithGradient: boolean('croppedWithGradient', false),
        size: select('size', fontSizes, 'm'),
        align: select(
          'align',
          {
            left: textAligns[0],
            center: textAligns[1],
            right: textAligns[2],
            '--': undefined,
          },
          undefined
        ),
        decoration: boolean('underline', false) ? 'underline' : undefined,
        font: select('font', fontFamilies, undefined),
        lineHeight: select('lineHeight', lineHeights, undefined),
        spacing: select('spacing', textSpacings, undefined),
        fontStyle: boolean('italic', false) ? 'italic' : undefined,
        transform: boolean('uppercase', false) ? 'uppercase' : undefined,
        weight: select('weight', fontWeights, undefined),
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
