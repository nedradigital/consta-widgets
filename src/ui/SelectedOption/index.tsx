import React from 'react'

import css from './index.css'

type Props = {
  name: string
  onRemove: () => void
}

export const SelectedOption: React.FC<Props> = ({ name, onRemove }) => (
  <div className={css.option}>
    <p className={css.label}>{name}</p>
    <button
      title="Удалить"
      onClick={event => {
        event.stopPropagation()
        onRemove()
      }}
      className={css.buttonCross}
      type="button"
    />
  </div>
)
