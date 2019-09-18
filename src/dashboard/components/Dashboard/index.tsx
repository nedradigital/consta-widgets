import * as React from 'react'
import { useDrop } from 'react-dnd'
import ReactGridLayout, { Layout, WidthProvider } from 'react-grid-layout-tmp-fork'

import { useUniqueNameGenerator } from '@/utils/uniq-name-hook'

import { ItemTypes } from '../../dnd-constants'
import { Data, Dataset } from '../../types'
import { Box, BoxItem } from '../Box'

import css from './index.css'

const GridLayout = WidthProvider(ReactGridLayout)

export type Config = { [key: string]: readonly BoxItem[] }

export type DashboardState = {
  boxes: readonly Layout[]
  config: Config
}

export type DashboardProps = {
  margin?: readonly [number, number]
  cols?: number
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (dashboard: DashboardState) => void
  dashboard: DashboardState
  data: Data
}

export const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const { margin, cols, viewMode, onChange, dashboard, datasets, data } = props
  const { boxes, config } = dashboard

  const { getUniqueName, removeName } = useUniqueNameGenerator(boxes.map(box => box.i!))

  const [dropPromise, setDropPromise] = React.useState(Promise.resolve({ x: 0, y: 0 }))

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => {
      dropPromise.then(({ x, y }: { x: number; y: number }) => {
        const newBoxes: readonly Layout[] = [
          ...boxes,
          { i: getUniqueName(ItemTypes.BOX), x, y, w: 1, h: 1 },
        ]

        onChange({ boxes: newBoxes, config })
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

  const onResizeStop = (value: readonly Layout[]) => {
    onChange({ boxes: value, config })
  }

  const removeBox = (name: string) => {
    const { [name]: value, ...restConfig } = config

    removeName(name)
    onChange({
      boxes: boxes.filter(item => item.i !== name),
      config: restConfig,
    })
  }

  const changeBox = (name: string, items: readonly BoxItem[]) => {
    onChange({
      boxes,
      config: {
        ...config,
        [name]: items,
      },
    })
  }

  return (
    <div ref={drop} className={css.dashboard}>
      <GridLayout
        margin={margin as /* tslint:disable-line:readonly-array */ [number, number]}
        cols={cols}
        className="layout"
        measureBeforeMount
        compactType={null}
        preventCollision
        isDroppable={!viewMode}
        isDraggable={!viewMode}
        isResizable={!viewMode}
        onDrop={onDrop}
        droppingPositionShift={{ x: -110, y: -80 }}
        onResizeStop={onResizeStop}
      >
        {boxes.map(box => (
          <div key={box.i} data-grid={{ x: box.x, y: box.y, w: box.w, h: box.h }}>
            <Box
              data={data}
              viewMode={viewMode}
              onChange={items => changeBox(box.i!, items)}
              items={config[box.i!]}
              datasets={datasets}
            />
            {!viewMode ? (
              <button
                className={css.removeBox}
                type="button"
                onClick={() => removeBox(box.i!)}
                children="⚔"
              />
            ) : null}
          </div>
        ))}
      </GridLayout>
    </div>
  )
}
