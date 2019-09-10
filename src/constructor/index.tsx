import * as React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Dashboard, DashboardProps, DashboardState } from './components/Dashboard'
import { Menu, MenuProps } from './components/Menu'
import css from './index.css'

// с webpack сейчас нормально не работает re-export, поэтому приходится делать так
// https://github.com/TypeStrong/ts-loader/issues/751
export type DashboardState = DashboardState

// TODO: нужно будет расширить enum в соотвествии с типами данных для графиков
export enum DataType {
  Chart2D,
  PieChart,
}

export type Dataset = {
  type: DataType
  name: string
  data: any
}

type ConstructorProps = DashboardProps & MenuProps

export const Constructor: React.FunctionComponent<ConstructorProps> = props => {
  const {
    margin,
    cols,
    breakpoints,
    datasets,
    onChange,
    dashboard,
    onClear,
    onToggleMode,
    viewMode,
  } = props

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.constructor}>
        <Menu onClear={onClear} onToggleMode={onToggleMode} />
        <Dashboard
          margin={margin}
          cols={cols}
          breakpoints={breakpoints}
          datasets={datasets}
          viewMode={viewMode}
          onChange={onChange}
          dashboard={dashboard}
        />
      </div>
    </DndProvider>
  )
}
