import * as React from 'react'

import { Box } from '../Box'

import css from './index.css'

export type MenuProps = {
  viewMode: boolean
  onToggleMode?: () => void
  onClear?: () => void
}

export const Menu: React.FunctionComponent<MenuProps> = ({ viewMode, onToggleMode, onClear }) => {
  return (
    <div className={css.menu}>
      <Box
        isPreview
        viewMode
        className={css.widgetWrapper}
        name="box"
        datasets={[]}
        onChange={() => {
          /**/
        }}
        data={{}}
      />
      <div className={css.buttons}>
        <button type="button" onClick={onToggleMode}>
          {viewMode ? 'Edit' : 'Preview'}
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}
