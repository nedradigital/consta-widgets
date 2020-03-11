import React from 'react'

import { boolean, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CheckboxWidgetContent, defaultParams } from '.'

const CheckboxWidgetStory = () => {
  const [value, setValue] = React.useState(false)

  return (
    <CheckboxWidgetContent
      data={{
        value,
        content: text('content', ''),
        disabled: boolean('disabled', false),
        intermediate: boolean('intermediate', false),
        onChange: e => setValue(e.target.checked),
      }}
      params={object('params', defaultParams)}
    />
  )
}

storiesOf('widgets/CheckboxWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <CheckboxWidgetStory />)
