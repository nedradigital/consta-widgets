import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { TextProps, TextSize } from '@/common/utils/ui-kit'
import { Badge, Size as BadgeSize, Status as BadgeStatus } from '@/Badge'

import css from './index.css'

const sizes = ['2xs', 'xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

const layouts = [
  'compact-title',
  'compact-unit',
  'full',
  'full-without-title',
  'full-reversed',
] as const
type Layout = typeof layouts[number]

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

const numberLineHeights: Record<Size, TextProps['lineHeight']> = {
  '2xs': 's',
  xs: 's',
  s: 'xs',
  m: 'xs',
  l: 'xs',
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
      <Text tag="div" size={titleSizes[size]} lineHeight="s" view="primary" className={css.title}>
        {title}
      </Text>

      <Text
        tag="div"
        view="primary"
        size={numberSizes[size]}
        lineHeight={numberLineHeights[size]}
        weight="bold"
        className={css.number}
      >
        {getNumberSign(value, withSign)}
        {formatValue(value)}
      </Text>

      {badge && (
        <Badge view="filled" wpSize={badgeSizes[size]} status={badge.status} className={css.badge}>
          {`${getNumberSign(badge.percentage, withSign)} ${badge.percentage}%`}
        </Badge>
      )}

      <Text tag="div" size={unitSizes[size]} lineHeight="s" view="secondary" className={css.unit}>
        {unit}
      </Text>
    </div>
  )
}
