import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import classnames from 'classnames'

import { move } from '@/utils/array'

import { Dataset } from '../../'
import { ItemTypes } from '../../dnd-constants'

import css from './index.css'

export type IWidget = {
  name: string
  props?: any
  datasets?: Dataset[]
}

export type Props = {
  name: string
  datasets?: Dataset[]
  viewMode?: boolean
  widgets?: IWidget[]
  onChangeWidgets?: (name: string, widgets: IWidget[]) => void
  data?: any
  className?: string
  isPreview?: boolean
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
  widgets = [],
  onChangeWidgets,
  data,
  isPreview,
  className,
  name,
  datasets,
}) => {
  const [selected, changeSelected] = useState(Object.keys(widgetsList)[0])

  const addWidget = () => {
    if (onChangeWidgets) {
      onChangeWidgets(name, [...widgets, { name: selected } as IWidget])
    }
  }

  const removeWidget = (index: number) => {
    const arr = [...widgets]
    arr.splice(index, 1)
    if (onChangeWidgets) {
      onChangeWidgets(name, arr)
    }
  }

  const changePosition = (index: number, direction: -1 | 1) => {
    if (onChangeWidgets) {
      onChangeWidgets(name, move(widgets, index, index + direction))
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
          <select value={selected} onChange={e => changeSelected(e.target.value)}>
            {Object.keys(widgetsList).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button className={css.add} type="button" onClick={addWidget}>
            ➕
          </button>
        </div>
      )}
      {widgets.map((widget, index) => {
        const Component: React.FC<{}> = widgetsList[widget.name][widget.name]

        if (viewMode) {
          return <Component data={data} {...widget.props} />
        }

        return (
          <WidgetEditorBox
            key={widget.name + index}
            index={index}
            changePosition={changePosition}
            lastElement={Boolean(index === widgets.length - 1)}
            removeWidget={removeWidget}
          >
            <Component data={data} {...widget.props} datasets={datasets} />
          </WidgetEditorBox>
        )
      })}
    </div>
  )
}
