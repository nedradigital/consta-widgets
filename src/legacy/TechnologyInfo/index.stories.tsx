import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechnologyInfo } from '.'

storiesOf('legacy/TechnologyInfo', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TechnologyInfo
      icon={'technology'}
      isNew={true}
      title={'Новая технология'}
      description={'Фишбон с уровнем TAML-5'}
    />
  ))
