import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TrajectoryChart } from '.'

storiesOf('legacy/Trajectory/TrajectoryChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('interactive', () => <TrajectoryChart />)
