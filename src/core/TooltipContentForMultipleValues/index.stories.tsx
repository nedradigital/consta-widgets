import React from 'react'

import { object, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/common/storybook'
import { Tooltip } from '@/Tooltip'

import { TooltipContentForMultipleValues } from '.'

export const Interactive = createStory(() => (
  <Tooltip isVisible position={{ x: 10, y: 10 }} direction="downRight">
    <TooltipContentForMultipleValues
      title={text('title', 'Тестовый заголовок')}
      items={object('items', [
        {
          color: 'var(--color-bg-alert)',
          name: 'Первый длинный заголовок',
          value: '10',
        },
        {
          color: 'var(--color-bg-normal)',
          name: 'Второй длинный заголовок',
          value: '10000000',
        },
      ])}
    />
  </Tooltip>
))

export default createMetadata({
  title: 'core/TooltipContentForMultipleValues',
})