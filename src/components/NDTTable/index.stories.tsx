import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { NDTTable } from '.'

storiesOf('components/NDT/Table', module)
  .addDecorator(blockCenteringDecorator({ width: '189px' }))
  .add('interactive', () => <NDTTable />)
