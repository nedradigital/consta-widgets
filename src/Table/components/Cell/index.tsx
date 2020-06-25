import classnames from 'classnames'

import css from './index.css'

export type VerticalAlign = 'top' | 'center' | 'bottom'
export type HorizontalAlign = 'left' | 'center' | 'right'

type Props = {
  column: {
    isSticky?: boolean
    isResized?: boolean
    sortable?: boolean
    filterable?: boolean
    align?: HorizontalAlign
  }
  onClick?: () => void
  style?: React.CSSProperties
  className?: string
  wrapperClassName?: string
  children: React.ReactNode
  showVerticalShadow?: boolean
} & (
  | {
      type: 'header'
      isSticky?: boolean
    }
  | {
      type: 'content'
      isClickable?: boolean
      verticalAlign: VerticalAlign
      isBorderTop?: boolean
      isBorderLeft?: boolean
    }
  | {
      type: 'resizer'
    }
)

const verticalCellAlignClasses: Record<VerticalAlign, string> = {
  top: css.verticalAlignTop,
  center: css.verticalAlignCenter,
  bottom: css.verticalAlignBottom,
}

const horizontalCellAlignClasses: Record<HorizontalAlign, string> = {
  left: css.horizontalAlignLeft,
  center: css.horizontalAlignCenter,
  right: css.horizontalAlignRight,
}

const getHorizontalAlign = (align: HorizontalAlign = 'left') => {
  return horizontalCellAlignClasses[align]
}

const getCellClasses = (props: Props) => {
  const { column, showVerticalShadow, className } = props

  const common = classnames(
    css.cell,
    column.isSticky && css.stickyOnLeft,
    column.isResized && css.isResized,
    column.sortable && css.isSortable,
    column.filterable && css.isFilterable,
    showVerticalShadow && css.showVerticalCellShadow,
    className
  )

  if (props.type === 'header') {
    return classnames(common, css.isHeader, props.isSticky && css.stickyOnTop)
  }

  if (props.type === 'resizer') {
    return classnames(common, css.isResizer, css.withoutBorder, css.stickyOnTop)
  }

  return classnames(
    common,
    props.isClickable && css.isClickable,
    props.isBorderTop && css.isBorderTop,
    props.isBorderLeft && css.isBorderLeft
  )
}

const getWrapperClasses = (props: Props) => {
  const { column, wrapperClassName } = props
  const common = classnames(css.wrapper, wrapperClassName)

  if (props.type === 'header') {
    return classnames(common, css.verticalAlignCenter, getHorizontalAlign(column.align))
  }

  if (props.type === 'resizer') {
    return classnames(common, css.withoutPadding)
  }

  return classnames(
    common,
    verticalCellAlignClasses[props.verticalAlign],
    getHorizontalAlign(column.align)
  )
}

export const Cell = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { style, onClick, children } = props

  return (
    <div ref={ref} className={getCellClasses(props)} style={style} onClick={onClick}>
      <div className={getWrapperClasses(props)}>{children}</div>
    </div>
  )
})
