import { date, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { subtractTime } from '@/utils/time';
import { blockCenteringDecorator } from '@/utils/Storybook';

import { Timer } from '.';

storiesOf('components/Timer', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Timer startTime={date('startTime', subtractTime(new Date(), 0, 9, 59.8))} />
  ));
