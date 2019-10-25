import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BackgroundStatusIndicator } from '.'

storiesOf('legacy/BackgroundStatusIndicator', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ height: '500px', position: 'relative', width: '100%' }))
  .add('interactive', () => <BackgroundStatusIndicator status={'danger'} />)
