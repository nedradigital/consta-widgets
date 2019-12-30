import classnames from 'classnames'

import { Badge, Status } from '@/ui/Badge'

import css from './index.css'

export const sizes = ['xs', 's', 'm', 'l'] as const
export type Size = typeof sizes[number]

export const layouts = [
  'compact-title',
  'compact-unit',
  'full',
  'full-without-title',
  'full-reversed',
] as const
export type Layout = typeof layouts[number]

export type Data = {
  value: number
  title?: string
  badge?: {
    percentage: number
    status: Status
  }
  unit?: string
}

type Props = Data & {
  size: Size
  layout?: Layout
  withSign?: boolean
}

const sizeClass = {
  xs: css.sizeXS,
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
}

const getNumberSign = (value: number, isShow?: boolean) => {
  return value > 0 && isShow ? '+' : ''
}

const formatValue = (value: number) => {
  return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const Stats: React.FC<Props> = ({
  value,
  title,
  badge,
  unit,
  size,
  layout = 'full',
  withSign,
}) => {
  return (
    <div className={classnames(css.container, sizeClass[size], css[layout])}>
      <div className={css.title}>{title}</div>
      <div className={css.number}>
        {getNumberSign(value, withSign)}
        {formatValue(value)}
      </div>
      {badge && (
        <Badge className={css.badge} status={badge.status}>
          {getNumberSign(badge.percentage, withSign)}
          {badge.percentage}%
        </Badge>
      )}
      <div className={css.unit}>{unit}</div>
    </div>
  )
}
