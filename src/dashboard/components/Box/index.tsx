import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import { move, removeAt, updateAt } from '@gaz/utils/lib/array'
import classnames from 'classnames'

import { BoxItemWrapper } from '@/dashboard/components/BoxItemWrapper'
import { Columns, emptyColumn } from '@/dashboard/components/Columns'
import { Settings } from '@/dashboard/components/Settings'
import { isWidget } from '@/utils/type-guards'
import { useUniqueNameGenerator } from '@/utils/uniq-name-hook'
import { WidgetType } from '@/utils/WidgetFactory'

import { ItemTypes } from '../../dnd-constants'
import { BoxItem, ColumnsContent, Data, Dataset } from '../../types'

import css from './index.css'

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

export const getWidget = (id: string): WidgetType<any, any> => {
  const name = widgetsList[id].widgetName

  return widgetsList[id][name]
}

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
  const [settingsOpenedFor, changeSettingsOpenedFor] = useState()
  const { getUniqueName, removeName } = useUniqueNameGenerator(
    items.filter(isWidget).map(item => item.id)
  )

  const addItem = () => {
    switch (selectedItem) {
      case 'columns': {
        onChange([...items, { type: 'columns', columns: [emptyColumn, emptyColumn], params: {} }])
        return
      }
      default: {
        const { showName, id, defaultParams } = getWidget(selectedItem)

        onChange([
          ...items,
          {
            type: 'widget',
            debugName: showName,
            id: getUniqueName(selectedItem),
            widgetType: id,
            params: defaultParams,
          },
        ])
        return
      }
    }
  }

  const removeItem = (index: number) => {
    const item = items[index]
    onChange(removeAt(items, index))

    if (isWidget(item)) {
      removeName(item.id)
    }
  }

  const changePosition = (index: number, direction: -1 | 1) => {
    onChange(move(items, index, index + direction))
  }

  const changeColumnsConfig = (index: number, columns: ColumnsContent) => {
    const item = items[index]

    if (item.type === 'columns') {
      onChange(updateAt(items, index, { ...item, columns }))
    }
  }

  const updateParams = (index: number, item: BoxItem) => {
    onChange(updateAt(items, index, item))
  }

  const openSettings = (index?: number) => {
    changeSettingsOpenedFor(index)
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
          <button className={css.add} type="button" onClick={addItem}>
            ➕
          </button>
        </div>
      )}
      {items.map((item, index) => {
        let component

        if (item.type === 'widget') {
          const Component = getWidget(item.widgetType)
          component = (
            <Component
              key={item.id}
              data={viewMode ? data : { [item.id]: Component.mockData }}
              dataKey={item.id}
              params={item.params}
              datasets={datasets}
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

        const settings = (
          <Settings
            item={item}
            datasets={datasets}
            onChange={newItem => {
              updateParams(index, newItem)
            }}
          />
        )

        return (
          <BoxItemWrapper
            key={index}
            index={index}
            viewMode={viewMode}
            lastElement={Boolean(index === items.length - 1)}
            isEditingSettings={index === settingsOpenedFor}
            isCustomItem={!isWidget(item)}
            params={item.params}
            settings={settings}
            onChangePosition={changePosition}
            onRemoveItem={removeItem}
            onOpenSettings={openSettings}
          >
            {component}
          </BoxItemWrapper>
        )
      })}
    </div>
  )
}
