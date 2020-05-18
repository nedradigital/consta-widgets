import React from 'react'

import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { ButtonWidget, ButtonWidgetContent, defaultParams } from './'

export const Interactive = createStory(() => (
  <ButtonWidgetContent
    data={object('data', ButtonWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export const WithTooltip = createStory(
  () => (
    <ButtonWidgetContent
      data={object('data', { ...ButtonWidget.mockData, tooltip: 'Я – тултип!' })}
      params={object('params', defaultParams)}
    />
  ),
  {
    name: 'с тултипом при наведении',
  }
)

export default createMetadata({
  title: 'widgets/ButtonWidget',

  decorators: [
    blockCenteringDecorator({
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    }),
  ],
})
