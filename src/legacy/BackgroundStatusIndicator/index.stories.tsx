import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BackgroundStatusIndicator } from '.'

storiesOf('legacy/BackgroundStatusIndicator', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ height: '500px', position: 'relative', width: '100%' }))
  .add('interactive', () => <BackgroundStatusIndicator status={'danger'} />)
