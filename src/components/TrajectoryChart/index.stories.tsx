import React from 'react'

import { select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses, TrajectoryChart } from '.'

storiesOf('components/TrajectoryChart', module)
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('without status', () => <TrajectoryChart />)
  .add('interactive', () => <TrajectoryChart status={select('status', statuses, statuses[0])} />)
