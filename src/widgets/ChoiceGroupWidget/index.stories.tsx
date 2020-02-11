import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Choice, ChoiceGroupWidgetContent, ChoiceItems, defaultParams } from '.'

const items: ChoiceItems = [
  {
    label: 'Сутки',
    value: 'day',
  },
  {
    label: 'Месяц',
    value: 'month',
  },
  {
    label: 'Год',
    value: 'year',
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
            onChange: value => {
              action('onChange')(value)
              setSingleValue(value)
            },
            isMultiple: false,
            value: singleValue,
            items: object('items', items),
            disabled: boolean('disabled', false),
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
            items: object('items', items),
            onChange: value => {
              action('onChange')(value)
              setMultipleValue(value)
            },
            isMultiple: true,
            value: multipleValue,
            disabled: boolean('disabled', false),
          }}
          params={object('params', defaultParams)}
        />
      )
    }

    return <Wrapper />
  })
