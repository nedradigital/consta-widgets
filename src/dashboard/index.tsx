import * as React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Dashboard, DashboardProps, DashboardState } from './components/Dashboard'
import { marginSizes, Menu, MenuProps } from './components/Menu'
import css from './index.css'
import { Data, DataMap, Dataset, Settings } from './types'

// с webpack сейчас нормально не работает re-export, поэтому приходится делать так
// https://github.com/TypeStrong/ts-loader/issues/751
export { DataType } from './types'
export type DashboardState = DashboardState
export type Data = Data
export type DataMap = DataMap
export type Dataset = Dataset

type ConstructorProps = DashboardProps & MenuProps

export const Constructor: React.FC<ConstructorProps> = props => {
  const {
    cols = 12,
    onChange,
    dashboard,
    onClear,
    onToggleMode,
    viewMode,
    datasets,
    data,
    widthScale,
    baseFontSize,
    baseMargin,
    basePadding,
    rowsCount,
  } = props

  const { margin = 'l' } = dashboard.settings
  const margins = baseMargin || [marginSizes[margin], marginSizes[margin]]

  const handleChangeSettings = React.useCallback(
    (settings: Settings) => {
      onChange({ ...dashboard, settings })
    },
    [dashboard, onChange]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.constructor}>
        <Menu
          onClear={onClear}
          onToggleMode={onToggleMode}
          onChange={handleChangeSettings}
          viewMode={viewMode}
          settings={dashboard.settings}
        />
        <Dashboard
          cols={cols}
          datasets={datasets}
          viewMode={viewMode}
          onChange={onChange}
          dashboard={dashboard}
          data={data}
          widthScale={widthScale}
          baseFontSize={baseFontSize}
          baseMargin={margins}
          basePadding={basePadding}
          rowsCount={rowsCount}
        />
      </div>
    </DndProvider>
  )
}
