import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { FilterTooltip } from '.'

const fewOptions = [
  { id: 'condition1', name: 'Условие 1' },
  { id: 'condition2', name: 'Условие 2' },
  { id: 'condition3', name: 'Условие 3' },
] as const

storiesOf('ui/FilterTooltip', module)
  .addDecorator(blockCenteringDecorator({ position: 'relative' }))
  .add('interactive', () => {
    const [isOpened, setIsOpened] = useState(true)
    const onSave = action('onSave')
    const onCancel = action('onCancel')

    return (
      <FilterTooltip
        field="Тестовый фильтр"
        isOpened={isOpened}
        values={[]}
        options={fewOptions}
        onSave={(...args) => {
          setIsOpened(false)
          onSave(...args)
        }}
        onCancel={(...args) => {
          setIsOpened(false)
          onCancel(...args)
        }}
        handleFilterTogglerClick={() => setIsOpened(!isOpened)}
      />
    )
  })
