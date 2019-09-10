import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { array } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KPIChart } from '.'

storiesOf('legacy/KPI/KPIChart', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '60vh' }))
  .add('interactive', () => (
    <KPIChart
      planData={array('planData', [50, 552, 552, 1779, 1779, 1779])}
      factData={array('factData', [52, 552, 552, 667, 1370, 1557])}
    />
  ))
