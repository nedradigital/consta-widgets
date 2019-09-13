import * as React from 'react'

import { Box } from '../Box'

import css from './index.css'

export type MenuProps = {
  onToggleMode?: () => void
  onClear?: () => void
}

export const Menu: React.FunctionComponent<MenuProps> = props => {
  const { onToggleMode, onClear } = props

  return (
    <div className={css.menu}>
      <Box className={css.widgetWrapper} name="box" />
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
