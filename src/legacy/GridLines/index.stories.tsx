import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { GridLines } from '.'

storiesOf('legacy/GridLines', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: '50vw', height: '50vh' }))
  .add('interactive', () => <GridLines columns={4} rows={4} />)
