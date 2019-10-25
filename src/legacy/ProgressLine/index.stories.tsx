import React from 'react'

import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ProgressLine } from '.'

storiesOf('legacy/ProgressLine', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ProgressLine progress={50} status={'normal'} type={'hollow'}>
      {text('children', '03:12:11')}
    </ProgressLine>
  ))
