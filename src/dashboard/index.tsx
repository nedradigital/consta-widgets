import * as React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Dashboard, DashboardProps, DashboardState } from './components/Dashboard'
import { Menu, MenuProps } from './components/Menu'
import css from './index.css'

// с webpack сейчас нормально не работает re-export, поэтому приходится делать так
// https://github.com/TypeStrong/ts-loader/issues/751
export type DashboardState = DashboardState

type ConstructorProps = DashboardProps & MenuProps

export const Constructor: React.FunctionComponent<ConstructorProps> = props => {
  const {
    cols,
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.constructor}>
        <Menu onClear={onClear} onToggleMode={onToggleMode} viewMode={viewMode} />
        <Dashboard
          cols={cols}
          datasets={datasets}
          viewMode={viewMode}
          onChange={onChange}
          dashboard={dashboard}
          data={data}
          widthScale={widthScale}
          baseFontSize={baseFontSize}
          baseMargin={baseMargin}
          basePadding={basePadding}
          rowsCount={rowsCount}
        />
      </div>
    </DndProvider>
  )
}
