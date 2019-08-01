import React from 'react';

import { radios, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { stringArrayToObjectMap } from '@/utils/array';
import { blockCenteringDecorator } from '@/utils/Storybook';

import { DirectionIndicator, directions } from '.';

storiesOf('components/DirectionIndicator', module)
  .addDecorator(blockCenteringDecorator())
  .addDecorator(withKnobs)
  .add('interactive', () => (
    <DirectionIndicator
      className={text('className', '')}
      direction={radios('direction', stringArrayToObjectMap(directions), directions[0])}
    />
  ));
