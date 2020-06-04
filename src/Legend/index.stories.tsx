import React from 'react'

import { object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import {
  blockCenteringDecorator,
  createMetadata,
  createStory,
  environmentDecorator,
} from '@/common/storybook'
import { ColorGroups } from '@/common/types'
import { labelPositions, labelTypes, sizes } from '@/LegendItem'

import { Legend } from '.'

const colorGroups: ColorGroups = {
  red: 'var(--color-bg-alert)',
  yellow: 'var(--color-bg-warning)',
  blue: 'var(--color-bg-normal)',
  purple: '#9b51e0',
  green: 'var(--color-bg-success)',
}

const data = [
  {
    colorGroupName: 'red',
    text: 'Красноватый текст',
  },
  {
    colorGroupName: 'yellow',
    text: 'Желтоватый текст',
  },
  {
    colorGroupName: 'blue',
    text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
  },
  {
    colorGroupName: 'purple',
    text: 'Пурпурный текст',
  },
  {
    colorGroupName: 'green',
    text: 'Зеленый цвет',
  },
] as const

export const Interactive = createStory(() => (
  <Legend
    data={object('data', data)}
    colorGroups={object('colorGroups', colorGroups)}
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
      width: 200,
    }),
    blockCenteringDecorator(),
  ],
})
