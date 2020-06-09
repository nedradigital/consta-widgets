import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { FilterTooltip } from '.'

export const Interactive = createStory(() => {
  const [isOpened, setIsOpened] = useState(true)
  const onSave = action('onSave')

  return (
    <FilterTooltip
      field="Тестовый фильтр"
      isOpened={isOpened}
      values={object('values', ['condition1'])}
      options={object('options', [
        { value: 'condition1', label: 'Условие 1' },
        { value: 'condition2', label: 'Условие 2' },
        { value: 'condition3', label: 'Условие 3' },
      ])}
      onChange={(field, values) => {
        onSave(field, values)
      }}
      onToggle={() => setIsOpened(!isOpened)}
    />
  )
})

export default createMetadata({
  title: 'components/FilterTooltip',
  decorators: [
    environmentDecorator({
      style: {
        position: 'relative',
      },
    }),
  ],
})
