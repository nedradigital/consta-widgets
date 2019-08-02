import React from 'react'

import { select, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses, TrajectoryChart } from '.'

storiesOf('components/TrajectoryChart', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('without status', () => <TrajectoryChart />)
  .add('interactive', () => <TrajectoryChart status={select('status', statuses, statuses[0])} />)
