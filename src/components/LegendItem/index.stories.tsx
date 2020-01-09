import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LegendItem } from '.'

storiesOf('components/LegentItem', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ maxWidth: 200 }))
  .add('interactive', () => (
    <LegendItem position="left" fontSize="s" type="dot" color="red">
      Тестовый текст
    </LegendItem>
  ))
