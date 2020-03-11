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
      backgroundColor: 'var(--bg-box)',
      width: 250,
    })
  )
  .add('interactive', () => (
    <Tooltip isVisible position={{ x: 10, y: 10 }}>
      <TooltipContentForMultipleValues
        title="Тестовый заголовок"
        items={[
          {
            color: 'red',
            name: 'Первый длинный заголовок',
            value: '10',
          },
          {
            color: 'blue',
            name: 'Второй длинный заголовок',
            value: '10000000',
          },
        ]}
      />
    </Tooltip>
  ))
