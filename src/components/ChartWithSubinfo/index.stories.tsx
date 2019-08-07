import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ChartWithSubinfo } from '.'

storiesOf('components/ChartWithSubinfo', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: '1034px' }))
  .add('interactive', () => (
    <ChartWithSubinfo
      chartName={text('chartName', 'Глубина по суткам')}
      chartUnits={text('chartUnits', 'Метры')}
      chartComponent={
        <div style={{ height: '410px', background: 'white', color: 'red' }}>chart</div>
      }
      subinfoComponent={<div>subinfo</div>}
      chartPopupComponent={<div>popup</div>}
    />
  ))
