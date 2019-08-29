import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechnologicalCharacteristics } from '.'

storiesOf('components/TechnologicalCharacteristics', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TechnologicalCharacteristics
      drillRig={'drillRig'}
      drillingIcon={'VZD'}
      drillingShortName={'drillingShortName'}
      mudIcon={'RUO'}
      mudShortName={'mudShortName'}
    />
  ))
