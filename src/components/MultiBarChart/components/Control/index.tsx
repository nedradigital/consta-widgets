import React from 'react'

import css from './index.css'

type Props = {
  paddingX: number
  changeDisplayValues: () => void
}

export const Control: React.FC<Props> = ({ paddingX, changeDisplayValues }) => {
  return (
    <div className={css.control} style={{ paddingLeft: paddingX }}>
      <div className={css.controls}>
        <div className={css.controlGroup}>
          <input
            type="checkbox"
            id="control-checkbox"
            className={css.checkbox}
            onChange={changeDisplayValues}
          />
          <label htmlFor="control-checkbox" className={css.labels} />
          Показать значения секций
        </div>
      </div>
    </div>
  )
}
