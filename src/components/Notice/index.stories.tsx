import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Notice } from '.'

storiesOf('components/Notice', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Notice
      description="Время операции превышено. Давление б/р в красном корридоре."
      startTime={new Date().valueOf()}
      title="Вероятность прихвата 90%"
    />
  ))
