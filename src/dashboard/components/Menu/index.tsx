import * as React from 'react'

import { Box } from '@/dashboard/components/Box'
import { MarginSize, Settings } from '@/dashboard/types'

import css from './index.css'

export const marginSizes = {
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
}

const margins = Object.keys(marginSizes) as readonly MarginSize[]

type Props = {
  settings: Settings
  onChange?: (settings: Settings) => void
}

export type MenuProps = {
  viewMode: boolean
  onToggleMode?: () => void
  onClear?: () => void
}

export const Menu: React.FC<Props & MenuProps> = ({
  viewMode,
  settings,
  onChange,
  onToggleMode,
  onClear,
}) => {
  const handleChangeMargin = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!!onChange) {
        onChange({ ...settings, margin: event.target.value as MarginSize })
      }
    },
    [onChange]
  )

  return (
    <div className={css.menu}>
      <Box
        isPreview
        viewMode
        className={css.widgetWrapper}
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
      <div className={css.settings}>
        <p>Отступы:</p>
        <select value={settings.margin} onChange={handleChangeMargin}>
          <option value={''}>--</option>
          {margins.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
