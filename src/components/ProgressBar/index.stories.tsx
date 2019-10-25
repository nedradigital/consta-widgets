import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ProgressBar } from './'

storiesOf('components/ProgressBar', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('interactive', () => (
    <ProgressBar
      size="m"
      color="#FFBA3B"
      value={70}
      valueMin={0}
      valueMax={120}
      ticks={[
        {
          label: 'Порог',
          value: 0,
        },
        {
          label: 'Цель',
          value: 50,
        },
        {
          label: 'Амцель',
          value: 120,
        },
      ]}
      summary={70}
    />
  ))
