import React from 'react'

import { select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BackgroundStatusIndicator, statuses } from '.'

storiesOf('components/BackgroundStatusIndicator', module)
  .addDecorator(blockCenteringDecorator({ height: '500px', position: 'relative', width: '100%' }))
  .add('interactive', () => (
    <BackgroundStatusIndicator status={select('Status', statuses, statuses[0])} />
  ))
