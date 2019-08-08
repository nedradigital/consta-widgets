import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTBlock } from '.'

storiesOf('components/NDT/Block', module)
  .addDecorator(blockCenteringDecorator({ width: '1034px' }))
  .add('interactive', () => <NDTBlock />)
