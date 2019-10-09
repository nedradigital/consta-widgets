import { useLayoutEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import ReactGridLayout, { Layout, WidthProvider } from 'react-grid-layout-tmp-fork'
import useDimensions from 'react-use-dimensions'

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
  baseMargin?: readonly [number, number]
  basePadding?: readonly [number, number]
  cols?: number
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (dashboard: DashboardState) => void
  dashboard: DashboardState
  data: Data
  baseFontSize: number
  widthScale?: number
  rowsCount: number
}

export const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const {
    cols,
    viewMode,
    onChange,
    dashboard,
    datasets,
    data,
    baseFontSize,
    baseMargin = [0, 0],
    basePadding = [0, 0],
    widthScale,
    rowsCount,
  } = props
  const { boxes, config } = dashboard

  const [demensionRef, { width, height }, element] = useDimensions()
  const [{ margin, padding }, setMarginAndPadding] = useState({
    margin: baseMargin,
    padding: basePadding,
  })

  const { getUniqueName, removeName } = useUniqueNameGenerator(boxes.map(box => box.i!))

  const [dropPromise, setDropPromise] = React.useState(Promise.resolve({ x: 0, y: 0 }))

  const [, dropRef] = useDrop({
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

  useLayoutEffect(() => {
    const scale = widthScale ? width / widthScale : 1

    if (widthScale) {
      setMarginAndPadding({
        margin: [scale * baseMargin[0], scale * baseMargin[1]],
        padding: [scale * basePadding[0], scale * basePadding[1]],
      })
    }

    if (element) {
      element.style.setProperty('--base-size', `${baseFontSize * scale}`)
    }
  }, [width])

  const rowHeight = (height - 2 * padding[1] + margin[1]) / rowsCount - margin[1]

  return (
    <div
      ref={el => {
        demensionRef(el)
        dropRef(el)
      }}
      className={css.dashboard}
    >
      <GridLayout
        autoSize={false}
        margin={margin as /* tslint:disable-line:readonly-array */ [number, number]}
        containerPadding={padding as /* tslint:disable-line:readonly-array */ [number, number]}
        cols={cols}
        rowHeight={rowHeight}
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
