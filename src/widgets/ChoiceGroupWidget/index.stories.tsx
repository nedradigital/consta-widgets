import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

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

export const ChoiceGroupWidgetSingleStory = createStory(
  () => {
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
  },
  { name: 'возможность выбора одного варианта' }
)

export const ChoiceGroupWidgetMultipleStory = createStory(
  () => {
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
  },
  { name: 'возможность выбора нескольких вариантов' }
)

export default createMetadata({
  title: 'widgets/ChoiceGroupWidget',
  decorators: [blockCenteringDecorator()],
})
