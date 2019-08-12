import React from 'react'

import { array, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KNBKScheme } from '.'

const data = [100, 98, 59, 42, 21, 2]

storiesOf('components/KNBKScheme', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ height: 166, position: 'relative', width: 60 }))
  .add('interactive', () => <KNBKScheme values={array('values', data)} />)
