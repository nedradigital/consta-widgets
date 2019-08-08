import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ReactComponent as Icon } from '../CurrentOperation/images/i-fb.svg'

import { colors, ElementWithIcon, orders } from '.'

storiesOf('components/ElementWithIcon', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ElementWithIcon
      icon={<Icon />}
      color={select('color', colors, colors[0])}
      order={select('order', orders, orders[0])}
    >
      {text('children', 'title')}
    </ElementWithIcon>
  ))
