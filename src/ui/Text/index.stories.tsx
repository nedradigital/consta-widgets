import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Text } from '.'

storiesOf('ui/Text', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Text size={select('size', sizes, sizes[0])}>{text('Text', 'Какой-то текст')}</Text>
  ))
