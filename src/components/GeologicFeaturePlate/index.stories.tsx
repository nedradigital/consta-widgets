import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { GeologicFeaturePlate } from '.'

storiesOf('components/GeologicFeaturePlate', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <GeologicFeaturePlate icon="abnormalPressure" title="Сероводород" text="от 10 до 1000м" />
  ))
