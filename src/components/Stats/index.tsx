import React from 'react'

import classnames from 'classnames'

import { Badge } from '@/ui/Badge'

import { Cell } from './components/Cell'
import css from './index.css'

export const sizes = ['xs', 's', 'm', 'l'] as const
export type Size = typeof sizes[number]

export const fieldUnits = ['сроки', 'суток'] as const
export type FieldUnits = typeof fieldUnits[number]

export type StyleProps = {
  size?: Size
}

export type Data = {
  number: string
  percent: string
}

type Props = {
  className?: string
  top?: string
  right?: string
  bottom?: string
  topSublabel?: boolean
  rightBadge?: boolean
  bottomBadge?: boolean
  children: React.ReactNode
} & StyleProps

export const Stats: React.FC<Props> = ({
  children,
  size = 'xs',
  top,
  right,
  bottom,
  topSublabel,
  rightBadge,
  bottomBadge,
  className,
}) => {
  const numberBottomValue = bottom ? parseFloat(bottom) : false
  const numberRightValue = right ? parseFloat(right) : false

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
      <div className={css.middle}>
        <span className={css.number}>{children}</span>
        {rightBadge && numberRightValue ? (
          <Badge status={numberRightValue > 0 ? 'normal' : 'danger'}>{right}</Badge>
        ) : (
          <Cell type={'sublabel'}>{right}</Cell>
        )}
      </div>
      <div className={css.row}>
        {bottomBadge && numberBottomValue ? (
          <Badge status={numberBottomValue > 0 ? 'normal' : 'danger'}>{bottom}</Badge>
        ) : (
          <Cell type={'sublabel'}>{bottom}</Cell>
        )}
      </div>
    </div>
  )
}
