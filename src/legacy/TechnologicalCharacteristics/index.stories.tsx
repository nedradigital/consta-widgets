import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechnologicalCharacteristics } from '.'

storiesOf('legacy/TechnologicalCharacteristics', module)
  .addDecorator(withSmartKnobs())
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
