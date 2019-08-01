import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { Timeline } from '.';

storiesOf('components/Timeline', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ height: '600px' }))
  .add('No data', () => <Timeline />)
  .add('Half empty data', () => (
    <Timeline data={[['22:04', 2904], ['22:12', 2891], ['22:21'], ['22:29'], [], [], []]} />
  ))
  .add('Full data', () => (
    <Timeline
      data={[
        ['22:04', 2904],
        ['22:12', 2891],
        ['22:21', 2883],
        ['22:29', 2883],
        ['22:38', 2869],
        ['22:46', 2869],
        ['22:54', 2883],
      ]}
    />
  ));
