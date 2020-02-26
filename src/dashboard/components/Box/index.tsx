import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import { move, removeAt, updateAt } from '@csssr/gpn-utils/lib/array'
import { Button } from '@gpn-design/uikit'
import classnames from 'classnames'

import { BoxItemWrapper } from '@/dashboard/components/BoxItemWrapper'
import { EMPTY_GRID_CONTENT, Grid } from '@/dashboard/components/Grid'
import { Settings } from '@/dashboard/components/Settings'
import { Switch, switchId } from '@/dashboard/components/Switch'
import { themeColorDark } from '@/utils/theme'
import { isSwitch, isWidget } from '@/utils/type-guards'
import { useUniqueNameGenerator } from '@/utils/uniq-name-hook'
import { getWidget, getWidgetComponentName, widgetIds } from '@/utils/widgets-list'

import { ItemTypes } from '../../dnd-constants'
import {
  BoxItem,
  Data,
  Dataset,
  GridContent,
  GridItem,
  SwitchContent,
  SwitchItem,
  VerticalAlignment,
  WidgetItem,
} from '../../types'

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
  verticalAlign?: VerticalAlignment
  parentName?: 'grid' | 'switch'
}

const emptyGrid: GridItem = {
  type: 'grid',
  grid: EMPTY_GRID_CONTENT,
  params: {},
}

const verticalAlignmentClasses = {
  bottom: css.verticalAlignBottom,
  middle: css.verticalAlignMiddle,
  top: undefined,
}

const getDebugName = (item: BoxItem): string => {
  if (item.type === 'grid') {
    return 'Сетка'
  }

  if (item.type === 'switch') {
    return 'Переключатель'
  }

  return item.debugName
}

const getCustomOptions = (parentName: Props['parentName']) => {
  if (parentName === 'switch') {
    return null
  }

  if (parentName === 'grid') {
    return (
      <optgroup label="Кастомные элементы">
        <option value="switch">Переключатель</option>
      </optgroup>
    )
  }

  return (
    <optgroup label="Кастомные элементы">
      <option value="grid">Сетка</option>
      <option value="switch">Переключатель</option>
    </optgroup>
  )
}

export const Box: React.FC<Props> = ({
  viewMode,
  items = [],
  onChange,
  data,
  isPreview,
  className,
  datasets,
  verticalAlign = 'top',
  parentName,
}) => {
  const [selectedItem, changeSelected] = useState(widgetIds[0])
  const [settingsOpenedFor, changeSettingsOpenedFor] = useState()
  const { getUniqueName, removeName } = useUniqueNameGenerator(
    items
      .filter((i): i is WidgetItem | SwitchItem => isWidget(i) || isSwitch(i))
      .map(item => item.id)
  )

  const addItem = () => {
    switch (selectedItem) {
      case 'grid': {
        onChange([...items, emptyGrid])
        return
      }
      case 'switch': {
        onChange([
          ...items,
          { id: getUniqueName(switchId), type: 'switch', displays: [[]], params: {} },
        ])
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

  const updateGrid = (index: number, grid: GridContent) => {
    const item = items[index]

    if (item.type === 'grid') {
      onChange(updateAt(items, index, { ...item, grid }))
    }
  }

  const updateSwitch = (index: number, displays: SwitchContent) => {
    const item = items[index]

    if (item.type === 'switch') {
      onChange(updateAt(items, index, { ...item, displays }))
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
        parentName && css.isNested,
        viewMode && css.isViewMode,
        verticalAlignmentClasses[verticalAlign]
      )}
      ref={isPreview ? dragRef : null}
      style={{ opacity }}
    >
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

        if (item.type === 'grid') {
          component = (
            <Grid
              datasets={datasets}
              grid={item.grid}
              viewMode={viewMode}
              onChange={gridContent => updateGrid(index, gridContent)}
              data={data}
            />
          )
        }

        if (item.type === 'switch') {
          component = (
            <Switch
              dataKey={item.id}
              datasets={datasets}
              displays={item.displays}
              viewMode={viewMode}
              data={data}
              onChange={switchContent => updateSwitch(index, switchContent)}
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
            customItemName={!isWidget(item) ? item.type : undefined}
            params={item.params}
            settings={settings}
            onChangePosition={changePosition}
            onRemoveItem={removeItem}
            onOpenSettings={openSettings}
            debugName={getDebugName(item)}
          >
            {component}
          </BoxItemWrapper>
        )
      })}
      {!viewMode && (
        <div className={classnames(css.panel, themeColorDark)}>
          + виджет
          <div className={css.panelHoveredContent}>
            <select
              value={selectedItem}
              onChange={e => changeSelected(e.target.value)}
              className={css.select}
            >
              <optgroup label="Виджеты">
                {widgetIds.map(id => (
                  <option key={id} value={id}>
                    {getWidgetComponentName(id)} ({getWidget(id).showName})
                  </option>
                ))}
              </optgroup>
              {getCustomOptions(parentName)}
            </select>
            <Button wpSize="xs" view="secondary" onClick={addItem}>
              Добавить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
