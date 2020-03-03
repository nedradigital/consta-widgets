import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Badge, BadgeSize, Status } from '@/ui/Badge'
import { TextSize } from '@/utils/ui-kit'

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

const titleSizes: Record<Size, TextSize> = {
  xs: 's',
  s: 'l',
  m: 'xl',
  l: '2xl',
}

const numberSizes: Record<Size, TextSize> = {
  xs: '2xl',
  s: '4xl',
  m: '5xl',
  l: '6xl',
}

const badgeSizes: Record<Size, BadgeSize> = {
  xs: 'xs',
  s: 'l',
  m: 'xl',
  l: '2xl',
}

const unitSizes: Record<Size, TextSize> = {
  xs: 'xs',
  s: 'l',
  m: 'xl',
  l: '2xl',
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
      <Text tag="div" size={titleSizes[size]} view="secondary" className={css.title}>
        {title}
      </Text>

      <Text tag="div" view="primary" size={numberSizes[size]} weight="bold" className={css.number}>
        {getNumberSign(value, withSign)}
        {formatValue(value)}
      </Text>

      {badge && (
        <Badge size={badgeSizes[size]} status={badge.status} className={css.badge}>
          {getNumberSign(badge.percentage, withSign)}
          {badge.percentage}%
        </Badge>
      )}

      <Text tag="div" size={unitSizes[size]} view="secondary" className={css.unit}>
        {unit}
      </Text>
    </div>
  )
}
