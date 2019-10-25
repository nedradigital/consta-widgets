import React from 'react'

import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TrajectoryBlock } from '.'

storiesOf('legacy/Trajectory/TrajectoryBlock', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 250 }))
  .add('interactive', () => (
    <TrajectoryBlock
      azimuth={-90}
      deflectorWedgePosition={number('deflectorWedgePosition', 121, {
        range: true,
        step: 1,
        min: 0,
        max: 360,
      })}
      dimensionalIntensity={122}
      absoluteDepth={123}
      verticalDepth={124}
      zenith={5.4}
      indicatorRight={0.1}
      indicatorBottom={5.6}
      depthDeviation={number('depthDeviation', 0.5, { range: true, step: 0.01, min: 0, max: 1 })}
    />
  ))
