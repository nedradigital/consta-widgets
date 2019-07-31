import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { enumToStringMap } from '@/utils/enum';
import { blockCenteringDecorator } from '@/utils/Storybook';

import { Spinner, SpinnerSize } from '.';

storiesOf('components/Spinner', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('default size', () => <Spinner />)
  .add('interactive', () => (
    <Spinner size={select('size', enumToStringMap(SpinnerSize), SpinnerSize.m)} />
  ));
