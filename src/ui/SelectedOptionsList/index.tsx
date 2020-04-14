import { IconClose } from '@gpn-design/uikit'
import classnames from 'classnames'

import { SelectedOption } from '@/ui/SelectedOption'

import css from './index.css'

type Props = {
  values: ReadonlyArray<{ id: string; name: string }>
  onRemove: (id: string) => void
  onReset: () => void
  className?: string
}

export const SelectedOptionsList: React.FC<Props> = ({ values, onRemove, onReset, className }) => {
  return (
    <div className={classnames(css.selectedFilters, className)}>
      <div className={css.options}>
        {values.map(option => (
          <div className={css.selectedOptionWrapper} key={option.id}>
            <SelectedOption name={option.name} onRemove={() => onRemove(option.id)} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onReset}
        className={css.buttonCross}
        title="Сбросить все фильтры"
      >
        <IconClose className={css.icon} size="xs" />
      </button>
    </div>
  )
}
