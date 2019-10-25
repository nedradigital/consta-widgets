import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KNBKScheme } from '.'

const data = [100, 98, 59, 42, 21, 2] as const

storiesOf('legacy/KNBK/Scheme', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ height: 166, position: 'relative', width: 60 }))
  .add('interactive', () => <KNBKScheme values={data} />)
