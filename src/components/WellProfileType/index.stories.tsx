import React from 'react'

import { number, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellProfileType } from '.'

storiesOf('components/WellProfileType', module)
  .addDecorator(blockCenteringDecorator({ width: 324 }))
  .add('interactive', () => (
    <WellProfileType
      erd={number('erd', 42)}
      objectiveName={text('objectiveName', 'test objective name')}
      taml={number('taml', 100)}
      wellTypeName={text('wellTypeName', 'test type name')}
    />
  ))
