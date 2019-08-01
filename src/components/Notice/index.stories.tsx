import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { Notice } from '.';

storiesOf('components/Notice', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Notice
      description={text(
        'description',
        'Время операции превышено. Давление б/р в красном корридоре.'
      )}
      startTime={new Date().getTime()}
      title={text('title', 'Вероятность прихвата 90%')}
    />
  ));
