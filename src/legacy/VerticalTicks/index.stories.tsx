import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { VerticalTicks } from '.'

storiesOf('legacy/VerticalTicks', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 400, height: '60vh' }))
  .add('interactive', () => (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ flexGrow: 1, padding: 10, backgroundColor: 'var(--bg-color-white)' }} />
      <VerticalTicks minValue={50} maxValue={90} ticks={10} precision={2} />
    </div>
  ))
