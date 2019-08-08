import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { GeologicFeaturePlate, icons } from '.'

storiesOf('components/GeologicFeaturePlate', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <GeologicFeaturePlate
      icon={select('icon', icons, icons[0])}
      title={text('title', 'Сероводород')}
      text={text('text', 'от 10 до 1000м')}
    />
  ))
