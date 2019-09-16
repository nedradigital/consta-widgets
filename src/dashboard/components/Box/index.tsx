import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import classnames from 'classnames'

import { move } from '@/utils/array'

import { Dataset } from '../../'
import { ItemTypes } from '../../dnd-constants'
import { Columns, ColumnsItem } from '../Columns'

import css from './index.css'

type WidgetItem = {
  name: string
  props?: any
  datasets?: Dataset[]
  type: 'widget'
}

export type BoxItem = WidgetItem | ColumnsItem

export type Props = {
  name?: string
  datasets?: Dataset[]
  viewMode?: boolean
  data?: any
  className?: string
  isPreview?: boolean
  items?: BoxItem[]
  onChange?: (items: BoxItem[]) => void
  customElements?: boolean
}

type WidgetEditorBoxProps = {
  lastElement: boolean
  index: number
  changePosition: (index: number, direction: 1 | -1) => void
  removeWidget: (index: number) => void
}

const widgetsList: { [key: string]: any } = {}
const req = require.context('../../../widgets', true, /index.tsx$/)
req.keys().forEach(key => (widgetsList[key.replace(/\.\/(.*)\/.*$/, '$1')] = req(key)))

const WidgetEditorBox: React.FC<WidgetEditorBoxProps> = ({
  children,
  index,
  changePosition,
  lastElement,
  removeWidget,
}) => {
  return (
    <div className={css.item}>
      {index > 0 ? (
        <button
          className={css.arrow}
          type="button"
          onClick={() => changePosition(index, -1)}
          children="⬆️"
        />
      ) : null}
      {!lastElement ? (
        <button
          className={classnames(css.arrow, css.down)}
          type="button"
          onClick={() => changePosition(index, 1)}
          children="⬇️"
        />
      ) : null}
      <button
        className={css.remove}
        type="button"
        children="💀"
        onClick={() => removeWidget(index)}
      />
      {children}
    </div>
  )
}

export const Box: React.FC<Props> = ({
  viewMode = true,
  items = [],
  onChange,
  data,
  isPreview,
  className,
  name,
  datasets,
  customElements,
}) => {
  const [selectedItem, changeSelected] = useState(Object.keys(widgetsList)[0])

  const addWidget = () => {
    if (onChange) {
      switch (selectedItem) {
        case 'columns':
          onChange([...items, { type: 'columns', columns: [[], []] }])
          return
        default:
          onChange([...items, { name: selectedItem, type: 'widget' }])
      }
    }
  }

  const removeWidget = (index: number) => {
    const arr = [...items]

    arr.splice(index, 1)

    if (onChange) {
      onChange(arr)
    }
  }

  const changePosition = (index: number, direction: -1 | 1) => {
    if (onChange) {
      onChange(move(items, index, index + direction))
    }
  }

  const changeColumnsConfig = (index: number, columns: BoxItem[][]) => {
    const arr = [...items] as ColumnsItem[]

    arr[index].columns = columns

    if (onChange) {
      onChange(arr)
    }
  }

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.BOX, name },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  return (
    <div
      className={classnames(css.box, className)}
      ref={isPreview ? null : dragRef}
      style={{ opacity }}
    >
      {!viewMode && (
        <div className={css.panel}>
          <select value={selectedItem} onChange={e => changeSelected(e.target.value)}>
            <optgroup label="Виджеты">
              {Object.keys(widgetsList).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </optgroup>
            {customElements ? (
              <optgroup label="Кастомные элементы">
                {['columns'].map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
          <button className={css.add} type="button" onClick={addWidget}>
            ➕
          </button>
        </div>
      )}
      {items.map((item, index) => {
        let component

        if (item.type === 'widget') {
          const Component: React.FC<{}> = widgetsList[item.name][item.name]
          component = <Component data={data} {...item.props} datasets={datasets} />
        }

        if (item.type === 'columns') {
          component = (
            <Columns
              datasets={datasets}
              columns={item.columns}
              viewMode={viewMode}
              onChange={columns => {
                changeColumnsConfig(index, columns)
              }}
              data={data}
              isPreview={isPreview}
            />
          )
        }

        if (viewMode) {
          return component
        }

        return (
          <WidgetEditorBox
            key={index}
            index={index}
            changePosition={changePosition}
            lastElement={Boolean(index === items.length - 1)}
            removeWidget={removeWidget}
          >
            {component}
          </WidgetEditorBox>
        )
      })}
    </div>
  )
}
