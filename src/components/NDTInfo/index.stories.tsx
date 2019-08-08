import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTInfo } from '.'

storiesOf('components/NDT/Info', module)
  .addDecorator(blockCenteringDecorator({ width: '189px' }))
  .add('interactive', () => <NDTInfo />)
