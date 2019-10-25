import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Spinner, SpinnerSize } from '@/legacy/Spinner'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { OpenableLabel } from '.'

storiesOf('legacy/OpenableLabel', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    return (
      <OpenableLabel
        className="external-classname"
        title="Конструкция хвостовика"
        shortTitle="Хвостовик"
        isInitiallyOpened={false}
        items={[
          'item 1',
          <div key={2} style={{ color: 'tomato' }}>
            item2
          </div>,
          <Spinner key={3} size={SpinnerSize.s} />,
        ]}
      />
    )
  })
