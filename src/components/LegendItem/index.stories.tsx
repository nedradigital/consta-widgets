import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { LegendItem } from '.'

storiesOf('components/LegentItem', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <LegendItem position="left" fontSize="s" type="dot" color="red" text="Тестовый текст" />
  ))
