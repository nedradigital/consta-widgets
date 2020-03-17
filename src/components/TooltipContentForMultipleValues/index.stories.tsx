import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Tooltip } from '@/components/Tooltip'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { TooltipContentForMultipleValues } from '.'

storiesOf('components/TooltipContentForMultipleValues', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(
    blockCenteringDecorator({
      backgroundColor: 'var(--color-control-bg-default)',
      width: 250,
    })
  )
  .add('interactive', () => (
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
