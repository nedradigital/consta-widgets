import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Stats } from './index'

storiesOf('components/Stats', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Stats
      title="Сроки"
      value={217}
      badge={{
        percentage: 2.1,
        status: 'normal',
      }}
      unit="суток"
      size="xs"
      layout="full"
    />
  ))
