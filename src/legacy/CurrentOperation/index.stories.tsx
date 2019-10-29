import React from 'react'

import { subtractTime } from '@gaz/utils/lib/time'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CurrentOperation } from '.'

storiesOf('legacy/CurrentOperation', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ border: '1px solid rgba(255, 255, 255, 0.5)' }))
  .add('interactive', () => (
    <CurrentOperation
      actualTime={subtractTime(new Date(), 0, 9, 59).valueOf()}
      title="Подъем с обратной проработкой"
      fb="Фишбон №3"
      duration="Duration"
    />
  ))
