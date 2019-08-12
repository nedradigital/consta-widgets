import React from 'react'

import { number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses, WellKPI } from '.'

storiesOf('components/WellKPI', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => (
    <WellKPI
      className={text('className', '.testClass')}
      factCost={number('factCost', 100)}
      costStatus={select('costStatus', statuses, statuses[0])}
      planDaysStatus={select('planDaysStatus', statuses, statuses[0])}
      drillingTimeStatus={select('drillingTimeStatus', statuses, statuses[0])}
      progress={number('progress', 100)}
      currentDay={number('currentDay', 10)}
      planDaysCount={number('planDaysCount', 100)}
      debit={number('debit', 42)}
      specificDrillingTime={number('specificDrillingTime', 42)}
    />
  ))
