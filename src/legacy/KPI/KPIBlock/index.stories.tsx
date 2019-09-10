import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KPIBlock } from '.'

storiesOf('legacy/KPI/KPIBlock', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '236px', height: '60vh' }))
  .add('interactive', () => (
    <KPIBlock
      title="Удельное время"
      planValue={12.1}
      factValue={11.5}
      deviation={-4.9}
      unit="Сут/1000м"
      planData={[50, 552, 552, 1779, 1779, 1779]}
      factData={[52, 552, 552, 667, 1370, 1557]}
      legend={[1, 2, 3]}
    />
  ))
