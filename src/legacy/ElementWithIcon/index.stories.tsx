import React from 'react'

import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ReactComponent as Icon } from '../CurrentOperation/images/i-fb.svg'

import { ElementWithIcon } from '.'

storiesOf('legacy/ElementWithIcon', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ElementWithIcon icon={<Icon />}>{text('children', 'title')}</ElementWithIcon>
  ))
