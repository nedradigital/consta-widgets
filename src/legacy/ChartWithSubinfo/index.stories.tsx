import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ChartWithSubinfo } from '.'

storiesOf('legacy/ChartWithSubinfo', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '1034px' }))
  .add('interactive', () => (
    <ChartWithSubinfo
      chartName="Глубина по суткам"
      chartUnits="Метры"
      chartComponent={
        <div style={{ height: '410px', background: 'white', color: 'red' }}>chart</div>
      }
      subinfoComponent={<div>subinfo</div>}
      chartPopupComponent={<div>popup</div>}
    />
  ))
