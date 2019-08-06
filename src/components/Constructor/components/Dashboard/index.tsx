import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout'

import { Dataset } from '../../'
import { ItemTypes } from '../../dnd-constants'
import { IWidget, Widget } from '../Widget'

import css from './index.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const uniqCounter: { [key: string]: number } = {}

const getUniqName = (name: string): string => {
  if (uniqCounter[name] != null) {
    uniqCounter[name] += 1
  } else {
    uniqCounter[name] = 0
  }

  return uniqCounter[name] ? `${name}(${uniqCounter[name]})` : `${name}(0)`
}

export type DashboardState = {
  widgets: IWidget[]
  layouts: Layouts
}

export type DashboardProps = {
  margin?: [number, number]
  cols?: { [P: string]: number }
  breakpoints?: { [P: string]: number }
  datasets: Dataset[]
  viewMode?: boolean
  onChange?: (dashboard: DashboardState) => void
  dashboard: DashboardState
}

export const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const { margin, cols, breakpoints, datasets, viewMode, onChange, dashboard } = props

  const { widgets, layouts } = dashboard

  const [, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop: (item: any) => {
      const newWidgets = [...widgets, { ...item, name: getUniqName(item.name) } as IWidget]

      if (onChange) {
        onChange({ widgets: newWidgets, layouts })
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      current: null,
    }),
  })

  const onDatasetChanged = (widgetName: string, value: string) => {
    const newWidgets = widgets.map(widget => {
      if (widget.name === widgetName) {
        widget.currentDatasetName = value
      }

      return widget
    })

    if (onChange) {
      onChange({ widgets: newWidgets, layouts })
    }
  }

  return (
    <div ref={drop} className={css.dashboard}>
      <ResponsiveReactGridLayout
        margin={margin}
        cols={cols}
        breakpoints={breakpoints}
        className="layout"
        layouts={layouts}
        measureBeforeMount
        compactType={null}
        onLayoutChange={(_, newLayoutsState) => {
          if (onChange) {
            onChange({ widgets, layouts: newLayoutsState })
          }
        }}
      >
        {widgets.map(widget => (
          <div key={widget.name} className={css.widgetWrapper}>
            <Widget
              dashboardMode
              datasets={datasets}
              name={widget.name}
              dataType={widget.dataType}
              currentDatasetName={widget.currentDatasetName}
              onDatasetChanged={onDatasetChanged}
              viewMode={viewMode}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  )
}
