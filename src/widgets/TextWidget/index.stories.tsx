import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'

import { textParams } from '@/dashboard/widget-params'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import {
  defaultParams,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  textAligns,
  textSpacings,
  TextWidgetContent,
  views,
} from '.'

export const Interactive = createStory(
  () => (
    <TextWidgetContent
      data={{
        text: text('data', ''),
        tooltip: <p>Контент тултипа</p>,
      }}
      params={{
        type: select('type', textParams.typeNames, defaultParams.type),
        text: text('text', defaultParams.text),
        croppedLineCount: number('croppedLineCount', 0),
        croppedWithGradient: boolean('croppedWithGradient', false),
      }}
    />
  ),
  {
    name: 'стандартный режим',
  }
)

export const Advanced = createStory(
  () => (
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
        view: select('view', views, 'primary'),
        spacing: select(
          'spacing',
          {
            xs: textSpacings[0],
            s: textSpacings[1],
            m: textSpacings[2],
            l: textSpacings[3],
            '--': undefined,
          },
          undefined
        ),
        fontStyle: boolean('italic', false) ? 'italic' : undefined,
        transform: boolean('uppercase', false) ? 'uppercase' : undefined,
        weight: select('weight', fontWeights, undefined),
      }}
    />
  ),
  {
    name: 'расширенный режим',
  }
)

export const WithOnClick = createStory(
  () => (
    <TextWidgetContent
      data={{
        text: text('data', ''),
        onClick: action('Клик по кнопке'),
      }}
      params={{
        text: text('title', defaultParams.text),
        type: select('type', textParams.typeNames, defaultParams.type),
        croppedLineCount: number('croppedLineCount', 0),
        croppedWithGradient: boolean('croppedWithGradient', false),
      }}
    />
  ),
  {
    name: 'с обработчиком для кнопки',
  }
)

export const WithTextWrapping = createStory(
  () => (
    <TextWidgetContent
      data={{ text: '' }}
      params={{
        text: text(
          'text',
          'Текст, который мы хотим перенести вот тут\nВот тут вот да и тут\nНу думаю смысл понятен'
        ),
        type: select('type', textParams.typeNames, defaultParams.type),
        croppedLineCount: 0,
        croppedWithGradient: false,
      }}
    />
  ),
  {
    name: 'с переносами',
  }
)

export const WithCroppedGradient = createStory(
  () => (
    <TextWidgetContent
      data={{ text: '' }}
      params={{
        text: text(
          'text',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        ),
        type: select('type', textParams.typeNames, defaultParams.type),
        croppedLineCount: number('croppedLineCount', 4),
        croppedWithGradient: boolean('croppedWithGradient', true),
      }}
    />
  ),
  {
    name: 'обрезанный градиентом',
  }
)

export default createMetadata({
  title: 'widgets/TextWidget',
  decorators: [
    blockCenteringDecorator({
      backgroundColor: 'var(--color-bg-secondary)',
      padding: 20,
      width: 350,
    }),
  ],
})
