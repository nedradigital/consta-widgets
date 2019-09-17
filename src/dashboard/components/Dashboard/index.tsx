import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout-tmp-fork'

import { useUniqueNameGenerator } from '@/utils/uniq-name-hook'

import { ItemTypes } from '../../dnd-constants'
import { Data, Dataset } from '../../types'
import { Box, BoxItem } from '../Box'

import css from './index.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

type DashboardBox = {
  name: string
  x?: number
  y?: number
}

export type DashboardState = {
  boxes: readonly DashboardBox[]
  layouts: Layouts
}

export type DashboardProps = {
  margin?: readonly [number, number]
  cols?: { [P: string]: number }
  breakpoints?: { [P: string]: number }
  datasets: readonly Dataset[]
  data: Data
  viewMode: boolean
  onChange: (dashboard: DashboardState) => void
  dashboard: DashboardState
  onChangeWidgets: (name: string, items: readonly BoxItem[]) => void
  config: { [key: string]: readonly BoxItem[] }
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
    data,
    datasets,
  } = props
  const { boxes, layouts } = dashboard
  // TODO дёрнуть removeName при удалении бокса
  const { getUniqueName } = useUniqueNameGenerator(boxes.map(box => box.name))

  const [dropPromise, setDropPromise] = React.useState(Promise.resolve({ x: 0, y: 0 }))

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item: any) => {
      dropPromise.then(({ x, y }: { x: number; y: number }) => {
        const newBoxes: readonly DashboardBox[] = [
          ...boxes,
          { ...item, name: getUniqueName(item.name), x, y },
        ]

        onChange({ boxes: newBoxes, layouts })
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
        margin={margin as /* tslint:disable-line:readonly-array */ [number, number]}
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
          onChange({ boxes, layouts: newLayoutsState })
        }}
      >
        {boxes.map(box => (
          <div
            key={box.name}
            data-grid={{ x: box.x, y: box.y, w: 1, h: 1 }}
            className={css.widgetWrapper}
          >
            <Box
              name={box.name}
              data={data}
              viewMode={viewMode}
              onChange={items => {
                onChangeWidgets(box.name, items)
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
