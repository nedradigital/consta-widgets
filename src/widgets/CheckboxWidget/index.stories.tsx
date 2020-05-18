import React from 'react'

import { boolean, object, text } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { CheckboxWidgetContent, defaultParams } from '.'

export const Interactive = createStory(() => {
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
})

export default createMetadata({
  title: 'widgets/CheckboxWidget',
  decorators: [blockCenteringDecorator()],
})
