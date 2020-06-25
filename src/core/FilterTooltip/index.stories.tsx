import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { FilterTooltip } from '.'

export const Interactive = createStory(() => {
  const [values, setValues] = React.useState<readonly string[]>(['condition1'])

  return (
    <FilterTooltip
      field="Тестовый фильтр"
      isOpened
      values={values}
      options={object('options', [
        { value: 'condition1', label: 'Условие 1' },
        { value: 'condition2', label: 'Условие 2' },
        { value: 'condition3', label: 'Очень длинное условие 3, которое не влезет во всю ширину' },
      ])}
      onChange={(field, newValues) => {
        action('onSave')(field, newValues)
        setValues(newValues)
      }}
      onToggle={() => null}
    />
  )
})

export default createMetadata({
  title: 'core/FilterTooltip',
  decorators: [
    environmentDecorator({
      style: {
        position: 'relative',
      },
    }),
  ],
})
