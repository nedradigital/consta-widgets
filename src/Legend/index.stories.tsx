import React from 'react'

import { number } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { ColorGroups } from '@/common/types'
import { blockCenteringDecorator, createMetadata, createStory } from '@/common/utils/Storybook'

import { Legend } from '.'

const colorGroups: ColorGroups = {
  red: 'var(--color-bg-alert)',
  yellow: 'var(--color-bg-warning)',
  blue: 'var(--color-bg-normal)',
  purple: '#9b51e0',
  green: 'var(--color-bg-success)',
}

const data: readonly any[] = [
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
]

export const Interactive = createStory(() => (
  <div style={{ width: number('wrapper width', 200) }}>
    <Legend
      data={data}
      colorGroups={colorGroups}
      direction="column"
      labelPosition="left"
      labelType="dot"
      fontSize="s"
    />
  </div>
))

export default createMetadata({
  title: 'components/Legend',
  decorators: [withSmartKnobs(), blockCenteringDecorator()],
})
