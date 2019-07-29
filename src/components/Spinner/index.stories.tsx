import React from 'react';

import { enumToStringMap } from '@/utils/enum';
import { blockCenteringDecorator } from '@/utils/Storybook';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Spinner } from '.';

storiesOf('components/Spinner', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('default size', () => <Spinner />)
  .add('interactive', () => (
    <Spinner size={select('size', enumToStringMap(Spinner.Size), Spinner.Size.m)} />
  ));
