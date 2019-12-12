import * as React from 'react'

import { Box } from '@/dashboard/components/Box'
import { migrations } from '@/dashboard/migration/migrations'
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
  version: number
  onChange: (settings: Settings) => void
  onChangeVersion: (newVersion: number) => void
}

export type MenuProps = {
  onClear?: () => void
}

export const Menu: React.FC<Props & MenuProps> = ({
  settings,
  version,
  onChange,
  onClear,
  onChangeVersion,
}) => {
  const handleChangeMargin = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...settings, margin: event.target.value as MarginSize })
    },
    [onChange, settings]
  )

  const handleChangeVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeVersion(Number(event.target.value))
  }

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
        <p>Версия данных:</p>
        <select value={version} onChange={handleChangeVersion}>
          <option value={0}>0</option>
          {migrations.map(({ versionTo }) => (
            <option key={versionTo} value={versionTo}>
              {versionTo}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
