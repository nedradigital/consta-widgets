import React from 'react'

import { action } from '@storybook/addon-actions'
import { select, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { SludgeTable } from '.'

const elements = [
  {
    name: 'Песчаник',
    value: 35,
  },
  {
    name: 'Цемент',
    value: 14,
  },
  {
    name: 'Алевролит',
    value: 9,
  },
  {
    name: 'Глина',
    value: 5,
  },
]

storiesOf('legacy/Sludge/SludgeTable', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <SludgeTable
      depth={1385}
      elements={elements.slice(0, select('Elements count', [0, 1, 2, 3, 4], 4))}
      onClick={action('onClick')}
    />
  ))
  .add('no data', () => <SludgeTable />)
