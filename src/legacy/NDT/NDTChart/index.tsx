import * as React from 'react'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'

import classnames from 'classnames'

import { createArrayOfIndexes } from '@/utils/array'
import { getDurations, getDurationsGrid } from '@/utils/duration'

import { npvDayType } from '../NDTBlock'

import { NDTChartBar } from './components/NDTChartBar'
import { NDTChartDurations } from './components/NDTChartDurations'
import css from './index.css'

const defaultWidth = 790
const defaultHeight = 323

export const types = [
  {
    name: 'accident',
    label: 'Аварии',
  },
  {
    name: 'trouble',
    label: 'Осложнения',
  },
  {
    name: 'geology',
    label: 'Геология',
  },
  {
    name: 'throwaway',
    label: 'Ликв.Брака',
  },
  {
    name: 'downtime',
    label: 'Простои',
  },
  {
    name: 'meteo',
    label: 'Метео',
  },
  {
    name: 'repair',
    label: 'Ремонт',
  },
]

type Props = {
  className?: string

  status?: 'normal' | 'warning' | 'danger'

  /** Текущий день строительства скважины */
  currentDay?: number

  /** Упорядоченный массив. Первый элемент = первый день и т.д. */
  npvList?: npvDayType[]
  selectedDay?: number
  onDayHover?: (day: number) => void
}

export const NDTChart: React.FC<Props> = ({
  className,
  currentDay,
  npvList,
  selectedDay,
  onDayHover,
}) => {
  const [width, setWidth] = React.useState(defaultWidth)
  const [height, setHeight] = React.useState(defaultHeight)
  const [dragging, setDragging] = React.useState(false)
  const viz = React.useRef<HTMLDivElement>(null)
  const currentDuration = currentDay || 0
  const maxDuration = Math.max(0, currentDuration, npvList ? npvList.length : 0)
  const hasValidData = Boolean(npvList)

  const updateSizes = () => {
    if (viz && viz.current) {
      setWidth(viz.current.getBoundingClientRect().height || defaultHeight)
      setHeight(viz.current.getBoundingClientRect().width || defaultWidth)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateSizes)

    return () => {
      window.removeEventListener('resize', updateSizes)
    }
  }, [])

  React.useLayoutEffect(updateSizes)

  const handleDrag = (_: DraggableEvent, { x }: DraggableData) => {
    const position = Math.min(1, Math.max(0, x / width))
    const hoverDay = Math.round(position * maxDuration)

    if (dragging && onDayHover) {
      onDayHover(hoverDay)
    }
  }

  const selectedDuration =
    selectedDay !== null ? Math.max(0, Math.min(maxDuration, selectedDay || 0)) : currentDuration

  const durations = getDurations(maxDuration)
  const durationsGrid = getDurationsGrid(npvList, maxDuration)

  return (
    <div className={classnames(css.main, className)} ref={viz}>
      {selectedDay !== null && (
        <div
          className={css.selectedBox}
          style={{ width: (selectedDuration / maxDuration) * 100 + '%' }}
        />
      )}
      <div>
        {durationsGrid.map((duration, index) => {
          return <div className={css.day} key={index} style={{ left: duration * 100 + '%' }} />
        })}
      </div>
      <div>
        {createArrayOfIndexes(types.length + 1).map(index => {
          return (
            <div
              className={css.line}
              key={index}
              style={{ top: (index / types.length) * 100 + '%' }}
            />
          )
        })}
      </div>
      <div className={css.types}>
        {types.map((type, index) => {
          return (
            <div className={classnames(css.types, css.type)} key={index}>
              <span className={classnames(css.types, css.type, css.typeLabel)}>{type.label}</span>
            </div>
          )
        })}
      </div>
      <DraggableCore
        onStart={() => setDragging(true)}
        onDrag={handleDrag}
        onStop={() => setDragging(false)}
      >
        <NDTChartDurations
          hasValidData={hasValidData}
          durations={durations}
          maxDuration={maxDuration}
          selectedDuration={selectedDuration}
          height={height}
        />
      </DraggableCore>
      {hasValidData && (
        <div
          className={css.current}
          style={{ left: (currentDuration / maxDuration) * 100 + '%' }}
        />
      )}
      <NDTChartBar maxDuration={maxDuration} width={width} height={height} npvList={npvList} />
    </div>
  )
}
