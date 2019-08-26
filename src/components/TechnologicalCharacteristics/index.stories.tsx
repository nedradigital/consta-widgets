import React from 'react'

import { select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { drillingIcons, mudIcons, TechnologicalCharacteristics } from '.'

storiesOf('components/TechnologicalCharacteristics', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TechnologicalCharacteristics
      drillRig={text('drillRig', 'drillRig')}
      drillingIcon={select('drilling', drillingIcons, drillingIcons[0])}
      drillingShortName={text('drillingShortName', 'drillingShortName')}
      mudIcon={select('mud', mudIcons, mudIcons[0])}
      mudShortName={text('mudShortName', 'mudShortName')}
    />
  ))
