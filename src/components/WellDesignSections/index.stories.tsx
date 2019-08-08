import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { objectives, voidTypes, WellDesignSections } from '.'

storiesOf('components/WellDesignSections', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <WellDesignSections
      sections={[
        object('section1', {
          stageKind: 'SH',
          stageNum: 10,
        }),
        object('section2', {
          stageKind: 'SN',
          stageNum: 12,
          hasTool: true,
          drillingEnd: false,
        }),
      ]}
      geology={{
        gnk: boolean('geology.gnk', true),
        vnk: boolean('geology.vnk', true),
        voidType: select('geology.voidType', voidTypes, voidTypes[0]),
        objective: select('geology.objective', objectives, objectives[0]),
      }}
      technology={object('technology', {
        fbCount: 10,
        mgrpCount: 10,
      })}
    />
  ))
