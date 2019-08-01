import React from 'react';

import { array, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { statuses } from '../KPIChart';

import { KPIBlock } from '.';

storiesOf('components/KPI/KPIBlock', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: '236px' }))
  .add('interactive', () => (
    <KPIBlock
      chartId="test-chart"
      title={text('title', 'Удельное время')}
      planValue={number('planValue', 12.1)}
      factValue={number('factValue', 11.5)}
      deviation={number('deviation', -4.9)}
      unit={text('unit', 'Сут/1000м')}
      planData={array('planData', [50, 552, 552, 1779, 1779, 1779], ',')}
      factData={array('factData', [52, 552, 552, 667, 1370, 1557], ',')}
      status={select('Status', statuses, 'normal')}
    />
  ));
