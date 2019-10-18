import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

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
