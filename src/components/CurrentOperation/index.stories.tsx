import React from 'react';

import { subtractTime } from '@/utils/time';
import { blockCenteringDecorator } from '@/utils/Storybook';
import { action } from '@storybook/addon-actions';
import { boolean, date, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { CurrentOperation } from '.';

storiesOf('components/CurrentOperation', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ border: '1px solid rgba(255, 255, 255, 0.5)' }))
  .add('interactive', () => (
    <CurrentOperation
      actualTime={date('actualTime', subtractTime(new Date(), 0, 9, 59))}
      title={text('title', 'Подъем с обратной проработкой')}
      fb={text('fb', 'Фишбон №3')}
      duration={text('duration', 'Duration')}
      isAdaptive={boolean('isAdaptive', false)}
      toggleAdaptive={action('toggleAdaptive')}
    />
  ));
