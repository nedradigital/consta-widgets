import React from 'react'

import classnames from 'classnames'

import { Badge, Status } from '@/ui/Badge'

import { Cell } from './components/Cell'
import css from './index.css'

export const sizes = ['xs', 's', 'm', 'l'] as const
export type Size = typeof sizes[number]

export type StyleProps = {
  size?: Size
}

export type Data = {
  number: string
  percent?: string
  bottomUnit: string
  rightUnit: string
}

type Props = {
  className?: string
  top?: string
  right?: string
  bottom?: string
  topSublabel?: boolean
  rightBadge?: boolean
  bottomBadge?: boolean
  statusBadge: Status
  number: string
} & StyleProps

const renderBadgeOrCell = (statusBadge: Status, isBadge?: boolean, value?: string) => {
  return isBadge ? (
    <Badge status={statusBadge} className={classnames(css.badge, css.cell)}>
      {value}
    </Badge>
  ) : (
    <Cell type={'sublabel'} className={css.cell}>
      {value}
    </Cell>
  )
}

export const Stats: React.FC<Props> = ({
  number,
  size = 'xs',
  top,
  right,
  bottom,
  topSublabel,
  rightBadge,
  bottomBadge,
  statusBadge,
  className,
}) => {
  return (
    <div
      className={classnames(
        {
          xs: css.sizeXS,
          s: css.sizeS,
          m: css.sizeM,
          l: css.sizeL,
        }[size],
        className,
        css.stats
      )}
    >
      <div className={css.row}>
        <Cell type={topSublabel ? 'sublabel' : 'label'}>{top}</Cell>
      </div>
      <div>
        <span className={css.number}>{number}</span>
        {renderBadgeOrCell(statusBadge, rightBadge, right)}
      </div>
      <div className={css.row}>{renderBadgeOrCell(statusBadge, bottomBadge, bottom)}</div>
    </div>
  )
}
