import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CardWithBadgeContent, defaultParams } from '.'

storiesOf('widgets/CardWithBadge', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <CardWithBadgeContent data={undefined} params={object('params', defaultParams)} />
  ))
