import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BadgeWidget, BadgeWidgetContent, defaultParams } from '.'

storiesOf('widgets/BadgeWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <BadgeWidgetContent
      data={object('data', BadgeWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
