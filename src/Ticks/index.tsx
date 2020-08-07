import { Text, TextPropSize } from '@gpn-design/uikit/Text'
import classnames from 'classnames'

import { Scaler } from '@/_private/utils/scale'

import css from './index.css'

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

export const positions = ['top', 'right', 'bottom', 'left'] as const
export type Position = typeof positions[number]

type Props<T> = {
  values: readonly T[]
  scaler: Scaler<T>
  position: Position
  size?: Size
  showLine?: boolean
  isTicksSnuggleOnEdge?: boolean
  className?: string
  style?: React.CSSProperties
  formatValueForLabel?: (value: T) => string
}

const textSizes: Record<Size, TextPropSize> = {
  s: '2xs',
  m: 'xs',
}

const positionClasses: Record<Position, string> = {
  top: css.isTop,
  right: css.isRight,
  bottom: css.isBottom,
  left: css.isLeft,
}

const getTransformTranslate = (x: number, y: number) => `translate(${x}px,${y}px)`

export function Ticks<T>(props: Props<T>) {
  const {
    className,
    values,
    scaler,
    position,
    size = 'm',
    showLine = true,
    isTicksSnuggleOnEdge = false,
    style,
    formatValueForLabel = String,
  } = props

  const isTop = position === 'top'
  const isBottom = position === 'bottom'
  const isHorizontal = isTop || isBottom

  const getBandwidth = (v: T) => {
    return scaler.bandwidth ? scaler.bandwidth(v) : 0
  }

  const getTickOffset = (v: T) => getBandwidth(v) / 2

  const tickTransform = isHorizontal
    ? (v: T) => getTransformTranslate((scaler.scale(v) || 0) + getTickOffset(v), 0)
    : (v: T) => getTransformTranslate(0, (scaler.scale(v) || 0) + getTickOffset(v))

  const positionClassName = positionClasses[position]

  const getAlignItems = (index: number, length: number) => {
    const isFirst = index === 0
    const isLast = index === length - 1

    if (
      (isHorizontal && isTicksSnuggleOnEdge && isFirst) ||
      (!isHorizontal && isTicksSnuggleOnEdge && isLast)
    ) {
      return 'flex-start'
    }

    if (
      (isHorizontal && isTicksSnuggleOnEdge && isLast) ||
      (!isHorizontal && isTicksSnuggleOnEdge && isFirst)
    ) {
      return 'flex-end'
    }

    return 'center'
  }

  return (
    <div className={classnames(css.group, positionClassName, className)} style={style}>
      {values.map((value, idx) => {
        const transform = tickTransform(value)
        const alignItems = getAlignItems(idx, values.length)

        return (
          <div key={idx} className={css.tick} style={{ transform, alignItems }}>
            <span
              className={scaler.bandwidth && css.label}
              style={{
                minWidth: isHorizontal ? getBandwidth(value) : undefined,
              }}
            >
              <Text
                as="div"
                view="secondary"
                size={textSizes[size]}
                align={isHorizontal ? 'center' : undefined}
              >
                {formatValueForLabel(value)}
              </Text>
            </span>
            {showLine && <span className={css.line} />}
          </div>
        )
      })}
    </div>
  )
}
