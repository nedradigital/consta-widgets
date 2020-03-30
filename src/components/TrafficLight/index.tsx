import React from 'react'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { Badge, BadgeSize, Status } from '@/ui/Badge'
import { PositionState } from '@/utils/tooltips'

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

const badgeSizes: Record<Size, BadgeSize> = {
  s: 'xs',
  m: 'l',
}

const sizeClasses: Record<Size, string> = { s: css.sizeS, m: css.sizeM }

type Props = {
  data: Data
  size?: Size
  type?: ValueType
}

export const TrafficLight: React.FC<Props> = ({ type = 'default', size = 's', data }) => {
  const { status, text, comment } = data

  const [tooltipVisible, setTooltipVisible] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState<PositionState>()

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
        <Tooltip isVisible={tooltipVisible && !!comment} position={tooltipPosition}>
          <Text tag="div" weight="bold" transform="uppercase" spacing="xs" view="primary">
            Комментарий:
          </Text>
          <Text className={css.tooltipContent} tag="div" view="primary">
            {comment}
          </Text>
        </Tooltip>
        <div
          className={classnames(css.background, sizeClasses[size])}
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
    <Badge size={badgeSizes[size]} status={status}>
      {text}
    </Badge>
  )
}
