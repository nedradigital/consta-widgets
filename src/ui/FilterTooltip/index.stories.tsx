import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { FilterTooltip } from '.'

const fewOptions = [
  { value: 'condition1', label: 'Условие 1' },
  { value: 'condition2', label: 'Условие 2' },
  { value: 'condition3', label: 'Условие 3' },
] as const

storiesOf('ui/FilterTooltip', module)
  .addDecorator(blockCenteringDecorator({ position: 'relative' }))
  .add('interactive', () => {
    const [isOpened, setIsOpened] = useState(true)
    const onSave = action('onSave')

    return (
      <FilterTooltip
        field="Тестовый фильтр"
        isOpened={isOpened}
        values={[]}
        options={fewOptions}
        onChange={(...args) => {
          onSave(...args)
        }}
        onToggle={() => setIsOpened(!isOpened)}
      />
    )
  })
