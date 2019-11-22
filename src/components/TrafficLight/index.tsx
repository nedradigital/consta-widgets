import React from 'react'

import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { Badge, Status } from '@/ui/Badge'

import css from './index.css'

export const valueTypes = ['default', 'text'] as const
export type ValueType = typeof valueTypes[number]

export type Data = {
  status: Status
  text?: string
  comment?: string
}

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  data: Data
  size?: Size
  type?: ValueType
}

export const TrafficLight: React.FC<Props> = ({ type = 'default', size = 's', data }) => {
  const { status, text, comment } = data
  const sizeClass = { s: css.sizeS, m: css.sizeM }[size]

  const [tooltipVisible, setTooltipVisible] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })

  if (type === 'default') {
    const statusClass = {
      normal: css.normal,
      warning: css.warning,
      danger: css.danger,
      empty: css.empty,
    }[status]

    const handleSetPosition = (node: Element) => {
      const { top, left, width } = node.getBoundingClientRect()
      setTooltipPosition({ x: left + width / 2, y: top })
    }

    const handleMouseEnter = (event: React.MouseEvent) => {
      handleSetPosition(event.currentTarget)
      setTooltipVisible(true)
    }

    const handleMouseMove = (event: React.MouseEvent) => {
      handleSetPosition(event.currentTarget)
    }

    return (
      <>
        <Tooltip
          isVisible={tooltipVisible && !!comment}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          direction="top"
        >
          <div className={css.tooltipTitle}>Комментарий:</div>
          <div className={css.tooltipContent}>{comment}</div>
        </Tooltip>
        <div
          className={classnames(css.background, sizeClass)}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <div className={classnames(css.foreground, statusClass)} />
        </div>
      </>
    )
  }

  return (
    <Badge className={classnames(css.text, sizeClass)} status={status}>
      {text}
    </Badge>
  )
}
