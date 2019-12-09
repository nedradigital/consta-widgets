import React from 'react'

import { boolean, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { CheckboxWidgetContent, defaultParams } from '.'

storiesOf('widgets/CheckboxWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
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

    return <Wrapper />
  })
