import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Switcher } from '.'

storiesOf('legacy/Switcher', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  // @ts-ignore
  .add('interactive', () => <Switcher isEnabled={false} title={'Абсолют.'} />)
