import React from 'react'

import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Choice, ChoiceGroupWidgetContent, ChoiceItems, defaultParams } from '.'

const items: ChoiceItems = [
  {
    label: 'Месяц',
    value: 'month',
  },
  {
    label: 'Сутки',
    value: 'day',
  },
]

storiesOf('widgets/ChoiceGroupWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('Single select interactive', () => {
    const Wrapper = () => {
      const [singleValue, setSingleValue] = React.useState<Choice | null>(null)

      return (
        <ChoiceGroupWidgetContent
          data={{
            items,
            onChange: value => {
              action('onChange')(value)
              setSingleValue(value)
            },
            isMultiple: false,
            value: singleValue,
            disabled: false,
          }}
          params={object('params', defaultParams)}
        />
      )
    }

    return <Wrapper />
  })
  .add('Multiple select interactive', () => {
    const Wrapper = () => {
      const [multipleValue, setMultipleValue] = React.useState<readonly Choice[]>([])

      return (
        <ChoiceGroupWidgetContent
          data={{
            items,
            onChange: value => {
              action('onChange')(value)
              setMultipleValue(value)
            },
            isMultiple: true,
            value: multipleValue,
            disabled: false,
          }}
          params={object('params', defaultParams)}
        />
      )
    }

    return <Wrapper />
  })
