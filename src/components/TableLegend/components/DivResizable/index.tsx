import React, { useState } from 'react'

import css from './index.css'

type Props = {
  height: number
}

const getStyleVal = (element: HTMLElement, cssProperty: string) => {
  return window.getComputedStyle(element, null).getPropertyValue(cssProperty)
}

const calcPaddingDiff = (column?: HTMLElement) => {
  if (!column || getStyleVal(column, 'box-sizing') === 'border-box') {
    return 0
  }

  const paddingLeft = getStyleVal(column, 'padding-left')
  const paddingRight = getStyleVal(column, 'padding-right')

  return parseInt(paddingLeft, 10) + parseInt(paddingRight, 10)
}

const minWidth = 150

export const DivResizable: React.FC<Props> = ({ height }) => {
  let pageX: number
  let currentColumn: HTMLElement | null
  let nextColumn: HTMLElement | null
  let currentColumnWidth: number
  let nextColumnWidth: number
  const [isDrag, setStatusDrag] = useState(false)
  const refDiv = React.createRef<HTMLDivElement>()

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target) {
      setStatusDrag(true)
      currentColumn = (e.target as HTMLDivElement).parentElement
      if (currentColumn) {
        nextColumn = currentColumn.nextElementSibling as HTMLElement
        pageX = e.pageX

        const padding = calcPaddingDiff(currentColumn)

        currentColumnWidth = currentColumn.offsetWidth - padding
        if (nextColumn) {
          nextColumnWidth = nextColumn.offsetWidth - padding
        }
      }
    }
  }

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target) {
      const { style } = e.target as HTMLDivElement
      style.borderRight = '5px solid #0082CC'
    }
  }

  const onMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const { style } = e.target as HTMLDivElement
    style.borderRight = ''
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentColumn && isDrag) {
      const diffX = e.pageX - pageX

      if (nextColumn) {
        const style = nextColumn.style
        const width = nextColumnWidth - diffX

        style.width = width + 'px'
      }

      const currentWidth = currentColumnWidth + diffX

      if (currentWidth < minWidth) {
        // не двигаем столбец меньше минимальной ширины
        return false
      }

      currentColumn.style.width = currentWidth + 'px'
    }
  }

  const onMouseUp = () => {
    setStatusDrag(false)
    currentColumn = null
    nextColumn = null
    pageX = 0
    nextColumnWidth = 0
    currentColumnWidth = 0
  }

  return (
    <div
      ref={refDiv}
      className={css.divResizable}
      style={{ height }}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  )
}
