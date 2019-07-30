import React from 'react';

import { blockCenteringDecorator } from '@/utils/Storybook';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Pin, positions, skins, statuses } from '.';

storiesOf('components/Pin', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('default props', () => (
    <Pin title={text('Title text', '1540 м')}>{text('Text', 'Высокий риск обвала породы')}</Pin>
  ))
  .add('interactive', () => (
    <Pin
      position={select('Position', positions, 'left')}
      skin={select('Skin', skins, 'inside')}
      title={text('Title text', '1540 м')}
      status={select('Status', statuses, 'danger')}
    >
      {text('Text', 'Высокий риск обвала породы')}
    </Pin>
  ));
