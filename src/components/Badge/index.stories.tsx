import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Badge } from '.'

storiesOf('components/Badge', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <Badge>{text('children', '+4.8%')}</Badge>)
