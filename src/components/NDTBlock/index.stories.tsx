import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTBlock } from '.'

storiesOf('components/NDT/Block', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: '1034px' }))
  .add('interactive', () => <NDTBlock />)
