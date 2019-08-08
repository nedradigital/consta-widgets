import React from 'react'

import { number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ProgressTimeBlock, statuses } from '.'

storiesOf('components/ProgressTimeBlock', module)
  .addDecorator(blockCenteringDecorator({ width: '496px' }))
  .add('without props', () => <ProgressTimeBlock />)
  .add('statusTitle without status', () => (
    <ProgressTimeBlock statusTitle={text('statusTitle', 'Опережение')} />
  ))
  .add('interactive', () => (
    <ProgressTimeBlock
      currentDay={number('currentDay', 44)}
      endDate={text('endDate', '12 ЯНВ 2019')}
      hse={number('hse', 44)}
      planDaysCount={number('planDays', 54)}
      progress={number('progress', 50)}
      recAccepted={number('recAccepted', 1)}
      recRejected={number('recRejected', 0)}
      timeGap={number('timeGap', 6)}
      statusTitle={text('statusTitle', 'Опережение')}
      status={select('status', statuses, statuses[0])}
    />
  ))
