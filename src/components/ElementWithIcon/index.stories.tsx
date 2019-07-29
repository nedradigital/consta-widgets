import React from 'react';

import { blockCenteringDecorator } from '@/utils/Storybook';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ReactComponent as Icon } from '../CurrentOperation/images/i-fb.svg';

import { colors, ElementWithIcon, orders } from '.';

storiesOf('components/ElementWithIcon', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ElementWithIcon
      icon={<Icon />}
      color={select('color', colors, colors[0])}
      order={select('order', orders, orders[0])}
    >
      {text('children', 'title')}
    </ElementWithIcon>
  ));
