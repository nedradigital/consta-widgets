import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Notice } from '.'

storiesOf('legacy/Notice', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Notice
      description="Время операции превышено. Давление б/р в красном корридоре."
      startTime={new Date().valueOf()}
      title="Вероятность прихвата 90%"
    />
  ))
