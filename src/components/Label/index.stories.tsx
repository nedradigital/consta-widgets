import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { Label } from '.';

storiesOf('components/Label', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <Label>{text('Text', 'Забой: 2580 м')}</Label>);
