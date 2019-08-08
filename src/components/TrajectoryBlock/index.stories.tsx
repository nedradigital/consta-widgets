import React from 'react'

import { boolean, number, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses } from '../TrajectoryChart'

import { TrajectoryBlock } from '.'

storiesOf('components/TrajectoryBlock', module)
  .addDecorator(blockCenteringDecorator({ width: 250 }))
  .add('interactive', () => (
    <TrajectoryBlock
      isChartHidden={boolean('Is chart hidden', false)}
      azimuth={number('azimuth', -90)}
      deflectorWedgePosition={number('deflectorWedgePosition', 121, {
        range: true,
        step: 1,
        min: 0,
        max: 360,
      })}
      dimensionalIntensity={number('dimensionalIntensity', 122)}
      absoluteDepth={number('absoluteDepth', 123)}
      verticalDepth={number('verticalDepth', 124)}
      zenith={number('zenith', 5.4)}
      indicatorRight={number('indicatorRight', 0.1)}
      indicatorBottom={number('indicatorBottom', 5.6)}
      status={select('status', statuses, statuses[0])}
      depthDeviation={number('depthDeviation', 0.5, { range: true, step: 0.01, min: 0, max: 1 })}
    />
  ))
