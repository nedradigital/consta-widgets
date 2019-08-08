import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTChart } from '.'

storiesOf('components/NDT/Chart', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <NDTChart />)
