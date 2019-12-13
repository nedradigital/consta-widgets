import { SelectedOption } from '@/ui/SelectedOption'

import css from './index.css'

type Props = {
  values: ReadonlyArray<{ id: string; name: string }>
  onRemove: (id: string) => void
  onReset: () => void
}

export const SelectedOptionsList: React.FC<Props> = ({ values, onRemove, onReset }) => {
  return (
    <div className={css.selectedFilters}>
      {values.map(option => (
        <div className={css.selectedOptionWrapper} key={option.id}>
          <SelectedOption name={option.name} onRemove={() => onRemove(option.id)} />
        </div>
      ))}
      <button onClick={onReset} className={css.buttonCross} title="Сбросить всё фильтры" />
    </div>
  )
}
