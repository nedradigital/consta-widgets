import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import classnames from 'classnames'

import { move, removeAt, updateAt } from '@/utils/array'
import { useUniqueNameGenerator } from '@/utils/uniq-name-hook'
import { WidgetType } from '@/utils/WidgetFactory'

import { ItemTypes } from '../../dnd-constants'
import { Data, Dataset } from '../../types'
import { Columns, ColumnsItem, Items as ColumnItems } from '../Columns'

import css from './index.css'

export type WidgetItem = {
  type: 'widget'
  name: string
  key: string
  id: string
  params: {
    [key: string]: any
  }
}

export type BoxItem = WidgetItem | ColumnsItem

type Props = {
  datasets: readonly Dataset[]
  viewMode: boolean
  data: Data
  className?: string
  /** Флаг для отображения бокса в меню */
  isPreview?: boolean
  items?: readonly BoxItem[]
  onChange: (items: readonly BoxItem[]) => void
  isNestedBox?: boolean
}

type WidgetEditorBoxProps = {
  lastElement: boolean
  isEditing: boolean
  isCustomItem: boolean
  index: number
  changePosition: (index: number, direction: 1 | -1) => void
  removeItem: (index: number) => void
  editWidget: (index: number) => void
}

const widgetsList: { [key: string]: any } = {}
const req = require.context('../../../widgets', true, /index.tsx$/)
req.keys().forEach(key => {
  const widgetName = key.replace(/\.\/(.*)\/.*$/, '$1')
  const widgetId = req(key)[widgetName].id

  widgetsList[widgetId] = {
    widgetName,
    ...req(key),
  }
})

const getWidget = (id: string): WidgetType<any, any> => {
  const name = widgetsList[id].widgetName

  return widgetsList[id][name]
}

const WidgetEditorBox: React.FC<WidgetEditorBoxProps> = ({
  children,
  index,
  changePosition,
  lastElement,
  removeItem,
  editWidget,
  isEditing,
  isCustomItem,
}) => {
  return (
    <div
      className={classnames(css.item, isEditing && css.isEditing, isCustomItem && css.isCustomItem)}
    >
      {index > 0 ? (
        <button
          className={classnames(css.button, css.arrow)}
          type="button"
          onClick={() => changePosition(index, -1)}
          children="⬆️"
        />
      ) : null}
      {!lastElement ? (
        <button
          className={classnames(css.button, css.arrow, css.down)}
          type="button"
          onClick={() => changePosition(index, 1)}
          children="⬇️"
        />
      ) : null}
      <div className={css.editButtons}>
        <button
          className={css.button}
          type="button"
          children="💀"
          onClick={() => removeItem(index)}
        />
        {!isCustomItem && (
          <button
            className={css.button}
            type="button"
            children="✏️"
            onClick={() => editWidget(index)}
          />
        )}
      </div>
      {children}
    </div>
  )
}

const isWidget = (item: BoxItem): item is WidgetItem => item.type === 'widget'

export const Box: React.FC<Props> = ({
  viewMode,
  items = [],
  onChange,
  data,
  isPreview,
  className,
  datasets,
  isNestedBox,
}) => {
  const [selectedItem, changeSelected] = useState(Object.keys(widgetsList)[0])
  const [editedIndex, changeEdited] = useState()
  const { getUniqueName, removeName } = useUniqueNameGenerator(
    items.filter(isWidget).map(item => item.key)
  )

  const addItem = () => {
    switch (selectedItem) {
      case 'columns':
        onChange([...items, { type: 'columns', columns: [[], []] }])
        return
      default:
        onChange([
          ...items,
          {
            type: 'widget',
            name: selectedItem,
            key: getUniqueName(selectedItem),
            id: getWidget(selectedItem).id,
            params: getWidget(selectedItem).defaultParams,
          },
        ])
        return
    }
  }

  const removeItem = (index: number) => {
    const item = items[index]
    onChange(removeAt(items, index))

    if (isWidget(item)) {
      removeName(item.key)
    }
  }

  const changePosition = (index: number, direction: -1 | 1) => {
    onChange(move(items, index, index + direction))
  }

  const changeColumnsConfig = (index: number, columns: ColumnItems) => {
    const item = items[index]

    if (item.type === 'columns') {
      onChange(updateAt(items, index, { ...item, columns }))
    }
  }

  const updateParams = (index: number, params: any) => {
    const item = items[index]

    if (isWidget(item)) {
      onChange(updateAt(items, index, { ...item, params }))
    }
  }

  const editWidget = (index?: number) => {
    changeEdited(index)
  }

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.BOX },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  return (
    <div
      className={classnames(
        className,
        css.box,
        isNestedBox && css.isNested,
        viewMode && css.isViewMode
      )}
      ref={isPreview ? dragRef : null}
      style={{ opacity }}
    >
      {!viewMode && (
        <div className={css.panel}>
          <select value={selectedItem} onChange={e => changeSelected(e.target.value)}>
            <optgroup label="Виджеты">
              {Object.keys(widgetsList).map(key => (
                <option key={key} value={key}>
                  {widgetsList[key].widgetName} ({getWidget(key).showName})
                </option>
              ))}
            </optgroup>
            {isNestedBox ? null : (
              <optgroup label="Кастомные элементы">
                {['columns'].map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <button className={classnames(css.button, css.add)} type="button" onClick={addItem}>
            ➕
          </button>
        </div>
      )}
      {items.map((item, index) => {
        const isEditing = index === editedIndex
        let component

        if (item.type === 'widget') {
          const Component = getWidget(item.id)
          component = (
            <Component
              key={item.key}
              data={viewMode ? data : { [item.key]: Component.mockData }}
              dataKey={item.key}
              params={item.params}
              datasets={datasets}
              isEditing={isEditing}
              onChangeParams={newParams => {
                updateParams(index, newParams)
              }}
              requestCloseSettings={() => editWidget(undefined)}
            />
          )
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
            />
          )
        }

        if (viewMode) {
          return <div className={classnames(css.item, css.isViewMode)}>{component}</div>
        }

        return (
          <WidgetEditorBox
            key={index}
            index={index}
            changePosition={changePosition}
            lastElement={Boolean(index === items.length - 1)}
            removeItem={removeItem}
            editWidget={editWidget}
            isEditing={isEditing}
            isCustomItem={!isWidget(item)}
          >
            {component}
          </WidgetEditorBox>
        )
      })}
    </div>
  )
}
