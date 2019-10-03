import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, LegendWidgetContent } from '.'

storiesOf('widgets/LegendWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <LegendWidgetContent data={undefined} params={defaultParams} />)
