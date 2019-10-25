import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KPIChart } from '.'

storiesOf('legacy/KPI/KPIChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '60vh' }))
  .add('interactive', () => (
    <KPIChart
      planData={[50, 552, 552, 1779, 1779, 1779]}
      factData={[52, 552, 552, 667, 1370, 1557]}
    />
  ))
