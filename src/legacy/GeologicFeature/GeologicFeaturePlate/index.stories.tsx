import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { GeologicFeaturePlate } from '.'

storiesOf('legacy/GeologicFeature/GeologicFeaturePlate', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <GeologicFeaturePlate icon="abnormalPressure" title="Сероводород" text="от 10 до 1000м" />
  ))
