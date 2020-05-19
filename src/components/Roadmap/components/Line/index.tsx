import classnames from 'classnames'

import { getLineStyle } from '../../helpers'

import css from './index.css'

type View = 'fact' | 'forecast' | 'plan'

type Props = {
  monthWidth: number
  graphStartDate: number
  startDate: number
  endDate: number
  className?: string
  color?: string
  isActive?: boolean
  isInactive?: boolean
  view?: View
  withMargin?: boolean
  onClick?: React.MouseEventHandler
}

const viewClasses: Record<View, string> = {
  fact: css.isFact,
  forecast: css.isForecast,
  plan: css.isPlan,
}

export const Line = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    monthWidth,
    graphStartDate,
    view,
    startDate,
    endDate,
    className,
    color,
    isActive,
    isInactive,
    withMargin = false,
    onClick,
  } = props

  const { left, width } = getLineStyle({
    graphStartDate,
    startDate,
    endDate,
    monthWidth,
    withMargin,
  })
  const lineClasses = classnames(
    css.line,
    view && viewClasses[view],
    isActive && css.isActive,
    isInactive && css.isInactive,
    onClick && css.isInteractive,
    className
  )
  const style: React.CSSProperties = {
    left,
    width,
    backgroundColor: color,
  }

  return <div ref={ref} className={lineClasses} style={style} onClick={onClick} />
})
