import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellDesign } from '.'

const wellDesignData = {
  sections: [
    {
      stageName: 'СЭ',
      mdTop: 1147.0,
      mdBottom: 2225.0,
      isActual: true,
      stageNum: 4,
      mdPlanTop: null,
      mdPlanBottom: null,
      drillingEnd: 1553170800000,
      cementingEnd: 1553379300000,
      diameter: 177.8,
    },
    {
      stageName: 'СП1',
      mdTop: 461.0,
      mdBottom: 1147.0,
      isActual: true,
      stageNum: 3,
      mdPlanTop: null,
      mdPlanBottom: null,
      drillingEnd: 1552343400000,
      cementingEnd: 1552443540000,
      diameter: 244.5,
    },
    {
      stageName: 'СХ',
      mdTop: 2225.0,
      mdBottom: 4155.0,
      isActual: true,
      stageNum: 5,
      mdPlanTop: null,
      mdPlanBottom: null,
      drillingEnd: 1554247200000,
      cementingEnd: 1554479340000,
      diameter: 114.0,
    },
    {
      stageName: 'СН',
      mdTop: 6.0,
      mdBottom: 54.0,
      isActual: true,
      stageNum: 1,
      mdPlanTop: null,
      mdPlanBottom: null,
      drillingEnd: 1551373740000,
      cementingEnd: 1551389160000,
      diameter: 426.0,
    },
    {
      stageName: 'СК',
      mdTop: 54.0,
      mdBottom: 461.0,
      isActual: true,
      stageNum: 2,
      mdPlanTop: null,
      mdPlanBottom: null,
      drillingEnd: 1551814800000,
      cementingEnd: 1551944940000,
      diameter: 324.0,
    },
  ],
  grpCount: 0,
  fbCount: 0,
  bitDepth: 1809,
}

storiesOf('legacy/Well/Design', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <WellDesign {...wellDesignData} />)
