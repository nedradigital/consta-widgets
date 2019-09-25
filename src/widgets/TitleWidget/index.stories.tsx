import React from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TitleWidgetContent, typeNames } from '.'

storiesOf('widgets/TitleWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TitleWidgetContent
      data={undefined}
      params={{
        title: text('title', defaultParams.title),
        type: select('type', typeNames, defaultParams.type),
      }}
    />
  ))
