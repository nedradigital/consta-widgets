import { date, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Timer } from '.';

storiesOf('components/Timer', module)
  .addDecorator(withKnobs)
  .add('interactive', () => (
    <Timer
      startTime={date(
        'date in the past',
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 9 - 1000 * 60 * 59.8)
      )}
    />
  ));
