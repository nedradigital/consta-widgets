import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Map } from '.'
import { EXAMPLE_LOCATIONS, EXAMPLE_POINTS } from './example-data'

storiesOf('components/Map', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '100vw', height: '100vh' }))
  .add('interactive', () => <Map locations={EXAMPLE_LOCATIONS} points={EXAMPLE_POINTS} />)
