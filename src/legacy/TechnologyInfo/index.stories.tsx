import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

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
