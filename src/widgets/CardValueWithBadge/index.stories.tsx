import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CardValueWithBadge, CardValueWithBadgeContent, defaultParams } from '.'

storiesOf('widgets/CardValueWithBadge', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <CardValueWithBadgeContent
      data={object('data', CardValueWithBadge.mockData)}
      params={object('params', defaultParams)}
    />
  ))
