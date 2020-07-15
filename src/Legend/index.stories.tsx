import React from 'react'

import { object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { labelPositions, labelTypes, sizes } from '@/core/LegendItem'

import { Legend } from '.'

const data = [
  {
    color: 'var(--color-bg-alert)',
    text: 'Красноватый текст',
  },
  {
    color: 'var(--color-bg-warning)',
    text: 'Желтоватый текст',
  },
  {
    color: 'var(--color-bg-normal)',
    text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
  },
  {
    color: '#9b51e0',
    text: 'Пурпурный текст',
  },
  {
    color: 'var(--color-bg-success)',
    text: 'Зеленый цвет',
  },
] as const

export const Interactive = createStory(() => (
  <Legend
    data={object('data', data)}
    direction="column"
    labelPosition={select('labelPosition', labelPositions, labelPositions[1])}
    labelType={select('labelType', labelTypes, labelTypes[0])}
    fontSize={select('fontSize', sizes, sizes[1])}
  />
))

export default createMetadata({
  title: 'components/Legend',
  decorators: [
    withSmartKnobs(),
    environmentDecorator({
      style: {
        width: 200,
      },
    }),
  ],
})
