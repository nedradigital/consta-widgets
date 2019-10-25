import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LegendItem } from '.'

storiesOf('components/LegentItem', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <LegendItem position="left" fontSize="s" type="dot" color="red" text="Тестовый текст" />
  ))
