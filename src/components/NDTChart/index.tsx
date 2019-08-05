import * as React from 'react'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'

import { classname } from '@/utils/classname'

import { npvDayType } from '../NDTBlock'

import './index.css'

type NDTChartPropsType = {
  className?: string

  status?: 'normal' | 'warning' | 'danger'

  /** Текущий день строительства скважины */
  currentDay?: number

  /** Упорядоченный массив. Первый элемент = первый день и т.д. */
  npvList?: npvDayType[]
  selectedDay?: number
  onDayHover?: (day: number) => void
}

type NDTChartStateProps = {
  width: number
  height: number
}

const cn = classname('ndt-chart')

export class NDTChart extends React.Component<NDTChartPropsType, NDTChartStateProps> {
  state = {
    width: 0,
    height: 0,
  }

  viz: HTMLDivElement | null = null
  dragging = false

  componentDidMount() {
    window.addEventListener('resize', this.updateSizes)

    this.updateSizes()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSizes)
  }

  updateSizes = () => {
    this.setState({
      height: this.viz ? this.viz.getBoundingClientRect().height : 0,
      width: this.viz ? this.viz.getBoundingClientRect().width : 0,
    })
  }

  handleStart() {
    this.dragging = true
  }

  handleDrag(_: DraggableEvent, { x }: DraggableData) {
    const { currentDay, npvList } = this.props

    const position = Math.min(1, Math.max(0, x / this.state.width))

    const maxDuration = Math.max(0, currentDay || 0, npvList ? npvList.length : 0)

    const hoverDay = Math.round(position * maxDuration)

    if (this.dragging && this.props.onDayHover) {
      this.props.onDayHover(hoverDay)
    }
  }

  handleStop() {
    this.dragging = false
  }

  render() {
    const { className, currentDay, npvList, selectedDay } = this.props

    const width = this.state.width || 790
    const height = this.state.height || 323

    const hasValidData = npvList ? true : false

    const maxDuration = Math.max(0, currentDay || 0, npvList ? npvList.length : 0)

    const currentDuration = currentDay || 0
    const selectedDuration =
      selectedDay !== null ? Math.max(0, Math.min(maxDuration, selectedDay || 0)) : currentDay || 0

    const sanitizedData = npvList ? npvList : []

    const maxDurationSteps = Math.max(
      8,
      maxDuration < 32
        ? maxDuration
        : maxDuration > 96
        ? 32 - (maxDuration % 32)
        : 16 - (maxDuration % 16)
    )

    const durationsGrid = hasValidData
      ? new Array(maxDuration + 1)
          .fill(0)
          .map((_, index) => index)
          .filter(duration => {
            const step = Math.round(maxDuration / maxDurationSteps) || 1
            return duration === 0 || duration === maxDuration || duration % step === 0
          })
          .map(duration => duration / maxDuration)
      : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    const durations = new Array(maxDuration + 1)
      .fill(0)
      .map((_, index) => index)
      .filter(duration => {
        const step = Math.round(maxDuration / maxDurationSteps) || 1
        return duration === 0 || duration === maxDuration || duration % step === 0
      })

    const types = [
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

    return (
      <div className={cn(null, null, className)} ref={viz => (this.viz = viz)}>
        {selectedDay !== null && (
          <div
            className={cn('selected-box')}
            style={{ width: (selectedDuration / maxDuration) * 100 + '%' }}
          />
        )}
        <div className={cn('days')}>
          {durationsGrid.map((duration, index) => {
            return (
              <div className={cn('days-day')} key={index} style={{ left: duration * 100 + '%' }} />
            )
          })}
        </div>
        <div className={cn('lines')}>
          {new Array(types.length + 1).fill(null).map((_, index) => {
            return (
              <div
                className={cn('lines-line')}
                key={index}
                style={{ top: (index / types.length) * 100 + '%' }}
              />
            )
          })}
        </div>
        <div className={cn('types')}>
          {types.map((type, index) => {
            return (
              <div className={cn('types-type')} key={index}>
                <span className={cn('types-type-label')}>{type.label}</span>
              </div>
            )
          })}
        </div>
        <DraggableCore
          onStart={this.handleStart}
          onDrag={(e, d) => {
            this.handleDrag(e, d)
          }}
          onStop={this.handleStop}
        >
          <div className={cn('durations-wrapper')}>
            <div className={cn('durations')}>
              {hasValidData &&
                durations.map((duration, index) => {
                  return (
                    <div
                      className={cn('durations-duration')}
                      key={index}
                      style={{ left: (duration / maxDuration) * 100 + '%' }}
                    >
                      <span className={cn('durations-duration-label')}>{Math.round(duration)}</span>
                    </div>
                  )
                })}
              {hasValidData && (
                <div
                  className={cn('selected')}
                  style={{ left: (selectedDuration / maxDuration) * 100 + '%' }}
                >
                  <div className={cn('selected-line')} style={{ height: height + 37 + 'px' }} />
                  <div className={cn('selected-label')}>{Math.floor(selectedDuration)}</div>
                </div>
              )}
            </div>
          </div>
        </DraggableCore>
        {hasValidData && (
          <div
            className={cn('current')}
            style={{ left: (currentDuration / maxDuration) * 100 + '%' }}
          />
        )}
        <div className={cn('chart')} style={{ width: width + 'px', height: height + 'px' }}>
          {types.map((type, index) =>
            sanitizedData.map((data, day) => {
              const value = data[type.name] || 0
              const bottom = Math.min(1, (types.length - index - 1) / types.length) * 100 + '%'
              const left = Math.min(1, day / maxDuration) * 100 + '%'
              const chartBarWidth = Math.min(1, 1 / maxDuration) * 100 + '%'
              const chartBarHeight = (Math.min(1, value / 24) / types.length) * 100 + '%'

              return (
                <div
                  className={cn('chart-bar')}
                  key={index + '.' + day}
                  style={{
                    left: `calc(${left} + 1px)`,
                    bottom,
                    width: `calc(${chartBarWidth} - 1px)`,
                    height: `calc(${chartBarHeight} - 1px)`,
                  }}
                />
              )
            })
          )}
        </div>
      </div>
    )
  }
}
