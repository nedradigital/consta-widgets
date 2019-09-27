import React from 'react'

import { array } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { HorizontalTicks } from '.'

storiesOf('legacy/HorizontalTicks', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('array of labels', () => (
    <div>
      <div style={{ padding: 10, backgroundColor: 'var(--bg-color-white)' }}>График</div>
      <HorizontalTicks labels={array('labels', ['0', 'два', '3', '', 'last'])} />
    </div>
  ))
  .add('labels from render prop', () => (
    <HorizontalTicks
      columns={12}
      renderLabel={idx => {
        switch (idx) {
          case 0:
            return 'дек'
          case 3:
            return 'март'
          case 6:
            return 'июн'
          case 9:
            return 'сент'
          default:
            return null
        }
      }}
    />
  ))
