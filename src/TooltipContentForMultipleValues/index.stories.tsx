import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/utils/Storybook'
import { Tooltip } from '@/Tooltip'

import { TooltipContentForMultipleValues } from '.'

export const Interactive = createStory(() => (
  <Tooltip isVisible position={{ x: 10, y: 10 }}>
    <TooltipContentForMultipleValues
      title="Тестовый заголовок"
      items={[
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
      ]}
    />
  </Tooltip>
))

export default createMetadata({
  title: 'components/TooltipContentForMultipleValues',

  decorators: [
    withSmartKnobs(),
    blockCenteringDecorator({
      backgroundColor: 'var(--color-control-bg-default)',
      width: 250,
    }),
  ],
})
