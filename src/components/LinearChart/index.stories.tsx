import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LinearChart } from './index'

storiesOf('components/LinearChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh' }))
  .add('interactive', () => {
    return (
      <LinearChart values={[{ x: 0, y: -1 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 4 }]} />
    )
  })
