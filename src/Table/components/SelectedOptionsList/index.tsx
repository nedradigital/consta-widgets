import { Button } from '@gpn-design/uikit/Button'
import { IconClose } from '@gpn-design/uikit/IconClose'

import { SelectedOption } from '../SelectedOption'

import css from './index.css'

type Props = {
  values: ReadonlyArray<{ id: string; name: string }>
  onRemove: (id: string) => void
  onReset: () => void
}

export const SelectedOptionsList: React.FC<Props> = ({ values, onRemove, onReset }) => {
  return (
    <div className={css.main}>
      <div className={css.options}>
        {values.map(option => (
          <div className={css.option} key={option.id}>
            <SelectedOption name={option.name} onRemove={() => onRemove(option.id)} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        onClick={onReset}
        title="Сбросить все фильтры"
        size="xs"
        view="clear"
        onlyIcon
        iconLeft={IconClose}
        className={css.clear}
      />
    </div>
  )
}
