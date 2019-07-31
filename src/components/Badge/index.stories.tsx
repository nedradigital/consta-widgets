import React from 'react';

import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { Badge, statuses } from '.';

storiesOf('components/Badge', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Badge status={select('Status', statuses, 'danger')}>{text('Text', '+4.8%')}</Badge>
  ));
