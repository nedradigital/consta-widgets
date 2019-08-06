import * as React from 'react'
import { useDrag } from 'react-dnd'

import classnames from 'classnames'

import { Dataset, DataType } from '../../'
import { ItemTypes } from '../../dnd-constants'

import { ReactComponent as EditIcon } from './icons/edit.svg'
import { ReactComponent as SaveIcon } from './icons/save.svg'
import css from './index.css'

export interface IWidget {
  name: string
  dataType: DataType
  datasets?: Dataset[]
  currentDatasetName?: string
}

type WidgetProps = IWidget & {
  dashboardMode?: boolean
  className?: string
  datasets?: Dataset[]
  onDatasetChanged?: (name: string, value: string) => void
  viewMode?: boolean
}

// TODO: сам виджет нужно будет рефакторить исходя уже из того, как он на самом деле будет выглядеть
export const Widget: React.FunctionComponent<WidgetProps> = props => {
  const {
    name,
    dashboardMode,
    className,
    dataType,
    datasets,
    onDatasetChanged,
    currentDatasetName,
    viewMode,
  } = props

  const [isEdit, setEdit] = React.useState(false)

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.WIDGET, dataType, name },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const resultDatasets = (datasets || []).filter(d => d.type === dataType)
  const Icon = isEdit ? SaveIcon : EditIcon

  return (
    <div
      className={classnames(css.widget, className)}
      ref={dashboardMode ? null : dragRef}
      style={{ opacity }}
    >
      {!viewMode && dashboardMode && (
        <button className={css.editButton} onClick={() => setEdit(!isEdit)}>
          <Icon className={css.editIcon} />
        </button>
      )}
      {viewMode && <span>Данные из: {currentDatasetName || 'нет источника данных'}</span>}
      {!viewMode && !isEdit && <div>{name}</div>}
      {!viewMode && !isEdit && dashboardMode && currentDatasetName && (
        <div style={{ color: '#ccc' }}>Источник данных: {currentDatasetName}</div>
      )}
      {!viewMode && isEdit && (
        <span>
          <label>Тип данных:</label>
          <select
            className={css.select}
            onChange={e => onDatasetChanged && onDatasetChanged(name, e.currentTarget.value)}
            value={currentDatasetName}
          >
            <option>Без источника данных</option>
            {resultDatasets.map(d => (
              <option value={d.name} key={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </span>
      )}
    </div>
  )
}
