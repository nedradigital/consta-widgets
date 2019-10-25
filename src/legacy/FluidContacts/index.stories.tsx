import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { FluidContacts } from '.'

storiesOf('legacy/FluidContacts', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 226 }))
  .add('interactive', () => (
    <FluidContacts
      collectorTypeName="Имя раз"
      voidTypeName="Имя двас"
      htr={true}
      gnk={100}
      vnk={100}
      targetIntervalPower={100}
      vdTop={100}
    />
  ))
