import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, Title } from '.'

storiesOf('components/Title', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Title size={select('size', sizes, sizes[0])}>{text('Text', 'Какой-то заголовок')}</Title>
  ))
