import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ChoiceGroupWidget, ChoiceGroupWidgetContent, defaultParams } from '.'

storiesOf('widgets/ChoiceGroupWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ChoiceGroupWidgetContent
      data={object('data', ChoiceGroupWidget.mockData)}
      params={object('params', defaultParams)}
    />
  ))
