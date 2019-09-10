import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ProgressTimeBlock } from '.'

storiesOf('legacy/ProgressTimeBlock', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '496px' }))
  .add('without props', () => <ProgressTimeBlock />)
  .add('statusTitle without status', () => <ProgressTimeBlock statusTitle={'Опережение'} />)
  .add('interactive', () => (
    <ProgressTimeBlock
      currentDay={44}
      endDate={'12 ЯНВ 2019'}
      hse={44}
      planDaysCount={54}
      progress={50}
      recAccepted={1}
      timeGap={6}
      statusTitle={'Опережение'}
    />
  ))
