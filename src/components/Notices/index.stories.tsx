import React from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { subtractTime } from '@/utils/time';
import { blockCenteringDecorator } from '@/utils/Storybook';

import { Notices } from '.';

storiesOf('components/Notices', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const isMultiple = boolean('isMultiple', true);
    const notices = [
      {
        description: 'Время операции превышено. Давление б/р в красном корридоре.',
        startTime: new Date().getTime(),
        title: 'Вероятность прихвата 90%',
      },
      {
        description: 'Время операции превышено. Давление б/р в желтом корридоре.',
        startTime: subtractTime(new Date(), 0, 0, 3).getTime(),
        title: 'Вероятность прихвата 60%',
      },
    ];
    return <Notices notices={isMultiple ? notices : [notices[0]]} />;
  });
