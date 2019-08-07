import React from 'react'

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { FluidContacts } from '.'

storiesOf('components/FluidContacts', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: 226 }))
  .add('interactive', () => (
    <FluidContacts
      collectorTypeName={text('collectorTypeName', 'Имя раз')}
      voidTypeName={text('voidTypeName', 'Имя двас')}
      htr={boolean('htr', true)}
      gnk={number('gnk', 100)}
      vnk={number('vnk', 100)}
      targetIntervalPower={number('targetIntervalPower', 100)}
      vdTop={number('vdTop', 100)}
    />
  ))
