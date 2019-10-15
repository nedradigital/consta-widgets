import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { GeologicFeaturePlate } from '../GeologicFeaturePlate'

import { GeologicFeaturePlates } from '.'

storiesOf('legacy/GeologicFeature/GeologicFeaturePlates', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 500 }))
  .addParameters({
    props: {
      propTablesExclude: [GeologicFeaturePlate],
    },
  })
  .add('interactive', () => (
    <GeologicFeaturePlates>
      <GeologicFeaturePlate icon="abnormalPressure" title="Title 1" text="text" />
      <GeologicFeaturePlate icon="cg" title="Title 2" text="text" />
      <GeologicFeaturePlate icon="h2s" title="Title 3" text="text" />
      <GeologicFeaturePlate icon="permafrost" title="Title 4" text="text" />
    </GeologicFeaturePlates>
  ))
