import * as React from 'react'

import { DataType } from '../../'
import { Widget } from '../Widget'

import css from './index.css'

export type MenuProps = {
  onToggleMode?: () => void
  onClear?: () => void
}

export const Menu: React.FunctionComponent<MenuProps> = props => {
  const { onToggleMode, onClear } = props

  return (
    <div className={css.menu}>
      <Widget className={css.widgetWrapper} name="widget 1" dataType={DataType.Chart2D} />
      <Widget className={css.widgetWrapper} name="widget 2" dataType={DataType.Chart2D} />
      <Widget className={css.widgetWrapper} name="widget 3" dataType={DataType.PieChart} />
      <Widget className={css.widgetWrapper} name="widget 4" dataType={DataType.PieChart} />
      <div className={css.buttons}>
        <button type="button" onClick={onToggleMode}>
          Edit/Preview
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}
