import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Switcher } from '.'

storiesOf('legacy/Switcher', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  // @ts-ignore
  .add('interactive', () => <Switcher isEnabled={false} title={'Абсолют.'} />)
