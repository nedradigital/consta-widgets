import React from 'react';

import { blockCenteringDecorator } from '@/utils/Storybook';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BackgroundStatusIndicator, statuses } from '.';

storiesOf('components/BackgroundStatusIndicator', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ height: '500px', position: 'relative', width: '100%' }))
  .add('interactive', () => (
    <BackgroundStatusIndicator status={select('Status', statuses, statuses[0])} />
  ));
