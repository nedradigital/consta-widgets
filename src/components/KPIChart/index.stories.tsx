import React from 'react'

import { array, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KPIChart, statuses } from '.'

storiesOf('components/KPI/KPIChart', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <KPIChart
      id="test-chart"
      planData={array('planData', [50, 552, 552, 1779, 1779, 1779], ',')}
      factData={array('factData', [52, 552, 552, 667, 1370, 1557], ',')}
      status={select('Status', statuses, 'normal')}
    />
  ))
