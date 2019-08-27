import React from 'react'

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { icons, TechnologyInfo } from '.'

storiesOf('components/TechnologyInfo', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TechnologyInfo
      icon={select('Icon', icons, icons[0])}
      isNew={boolean('Is new', true)}
      title={text('Title', 'Новая технология')}
      description={text('Description', 'Фишбон с уровнем TAML-5')}
    />
  ))
