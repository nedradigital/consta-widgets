import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechnologyInfo } from '../TechnologyInfo'

import { Separator, TechnologiesBlock } from '.'

storiesOf('legacy/TechnologiesBlock', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .addParameters({
    props: {
      propTablesExclude: [TechnologyInfo],
    },
  })
  .add('interactive', () => (
    <TechnologiesBlock>
      <TechnologyInfo
        icon="technology"
        isNew={true}
        title="Новая технология"
        description="Фишбон с уровнем TAML-5"
      />
      <TechnologyInfo icon="mgrp" isNew={true} title="МГРП" description="8 стадий" />
      <Separator />
      <TechnologyInfo icon="length" title="Длина ГС" description="1000м" />
      <TechnologyInfo icon="fb" title="Фишбон" description="7 стволов по 300..500м" />
    </TechnologiesBlock>
  ))
