import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { StatsParams } from '@/dashboard/widget-params'
import { Badge, Size as BadgeSize, Status as BadgeStatus } from '@/ui/Badge'
import { TextSize } from '@/utils/ui-kit'

import css from './index.css'

type Size = StatsParams['size']
type Layout = StatsParams['layout']

export type Data = {
  value: number
  title?: string
  badge?: {
    percentage: number
    status: BadgeStatus
  }
  unit?: string
}

type Props = Data & {
  size: Size
  layout?: Layout
  withSign?: boolean
}

const sizeClass = {
  '2xs': css.size2XS,
  xs: css.sizeXS,
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
}

const layoutClass: Record<Layout, string> = {
  'compact-unit': css.compactUnit,
  'compact-title': css.compactTitle,
  full: css.full,
  'full-reversed': css.fullReversed,
  'full-without-title': css.fullWithoutTitle,
}

const titleSizes: Record<Size, TextSize> = {
  '2xs': 'xs',
  xs: 's',
  s: 'l',
  m: 'xl',
  l: '2xl',
}

const numberSizes: Record<Size, TextSize> = {
  '2xs': 'xl',
  xs: '2xl',
  s: '4xl',
  m: '5xl',
  l: '6xl',
}

const badgeSizes: Record<Size, BadgeSize> = {
  '2xs': 's',
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
}

const unitSizes: Record<Size, TextSize> = {
  '2xs': 'xs',
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
    <div className={classnames(css.container, sizeClass[size], layoutClass[layout])}>
      <Text tag="div" size={titleSizes[size]} view="secondary" className={css.title}>
        {title}
      </Text>

      <Text tag="div" view="primary" size={numberSizes[size]} weight="bold" className={css.number}>
        {getNumberSign(value, withSign)}
        {formatValue(value)}
      </Text>

      {badge && (
        <Badge view="filled" wpSize={badgeSizes[size]} status={badge.status} className={css.badge}>
          {`${getNumberSign(badge.percentage, withSign)} ${badge.percentage}%`}
        </Badge>
      )}

      <Text tag="div" size={unitSizes[size]} view="secondary" className={css.unit}>
        {unit}
      </Text>
    </div>
  )
}
