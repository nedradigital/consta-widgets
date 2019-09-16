import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout-tmp-fork'

import { Dataset } from '../../'
import { ItemTypes } from '../../dnd-constants'
import { Box, BoxItem } from '../Box'

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
  boxes: Array<{
    name: string
    x?: number
    y?: number
  }>
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
  onChangeWidgets?: (name: string, items: BoxItem[]) => void
  config: { [key: string]: BoxItem[] }
}

export const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const {
    margin,
    cols,
    breakpoints,
    viewMode,
    onChange,
    dashboard,
    onChangeWidgets,
    config,
    datasets,
  } = props
  const { boxes, layouts } = dashboard

  const [dropPromise, setDropPromise] = React.useState(Promise.resolve({ x: 0, y: 0 }))

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item: any) => {
      dropPromise.then(({ x, y }: { x: number; y: number }) => {
        const newBoxes = [...boxes, { ...item, name: getUniqName(item.name), x, y }]

        if (onChange) {
          onChange({ boxes: newBoxes, layouts })
        }
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      current: null,
    }),
  })

  const onDrop = (params: { x: number; y: number }) => {
    setDropPromise(new Promise(res => res(params)))
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
        preventCollision
        isDroppable={true}
        onDrop={onDrop}
        droppingPositionShift={{ x: -110, y: -80 }}
        onLayoutChange={(_, newLayoutsState) => {
          if (onChange) {
            onChange({ boxes, layouts: newLayoutsState })
          }
        }}
      >
        {boxes.map(box => (
          <div
            key={box.name}
            data-grid={{ x: box.x, y: box.y, w: 1, h: 1 }}
            className={css.widgetWrapper}
          >
            <Box
              isPreview
              name={box.name}
              data={{}}
              viewMode={viewMode}
              onChange={items => {
                if (onChangeWidgets) {
                  onChangeWidgets(box.name, items)
                }
              }}
              items={config[box.name]}
              datasets={datasets}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  )
}
