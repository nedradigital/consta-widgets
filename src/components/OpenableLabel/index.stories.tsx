import React from 'react';

import { Spinner } from '@/components/Spinner';
import { blockCenteringDecorator } from '@/utils/Storybook';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { OpenableLabel } from '.';

storiesOf('components/OpenableLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    return (
      <OpenableLabel
        className={text('Class name', 'external-classname')}
        title={text('Title', 'Конструкция хвостовика')}
        shortTitle={text('Short title', 'Хвостовик')}
        isInitiallyOpened={boolean('Is opened', false)}
        items={[
          'item 1',
          <div key={2} style={{ color: 'tomato' }}>
            item2
          </div>,
          <Spinner key={3} size={Spinner.Size.s} />,
        ]}
      />
    );
  });
