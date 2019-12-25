import classnames from 'classnames'

import css from './index.css'

export type Scaler<T> = {
  bandwidth?: () => number
  ticks?: (count?: number) => readonly number[]
  (x: T): number | undefined
}

export const positions = ['top', 'right', 'bottom', 'left'] as const
export type Position = typeof positions[number]

type Props<T> = {
  values: readonly T[]
  scaler: Scaler<T>
  position: Position
  showLine?: boolean
  isTicksSnuggleOnEdge?: boolean
  className?: string
  style?: React.CSSProperties
  formatValueForLabel?: (value: T) => string
}

const getTransformTranslate = (x: number, y: number) => `translate(${x}px,${y}px)`

export function Ticks<T>(props: Props<T>) {
  const {
    className,
    values,
    scaler,
    position,
    showLine = true,
    isTicksSnuggleOnEdge = false,
    style,
    formatValueForLabel,
  } = props

  const isTop = position === 'top'
  const isRight = position === 'right'
  const isBottom = position === 'bottom'
  const isLeft = position === 'left'
  const isHorizontal = isTop || isBottom

  const scalerOffset = scaler.bandwidth ? scaler.bandwidth() / 2 : 0
  const format = formatValueForLabel ? formatValueForLabel : String

  const tickTransform = isHorizontal
    ? (v: T) => getTransformTranslate((scaler(v) || 0) + scalerOffset, 0)
    : (v: T) => getTransformTranslate(0, (scaler(v) || 0) + scalerOffset)

  const positionsClassNames = [
    isTop && css.isTop,
    isRight && css.isRight,
    isBottom && css.isBottom,
    isLeft && css.isLeft,
  ] as const

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

  const renderLine = (condition: boolean) => {
    if (showLine && condition) {
      return <span className={classnames(css.line, positionsClassNames)} />
    }

    return null
  }

  return (
    <div className={classnames(css.group, positionsClassNames, className)} style={style}>
      {values.map((value, idx) => {
        const transform = tickTransform(value)
        const alignItems = getAlignItems(idx, values.length)

        return (
          <div
            key={idx}
            className={classnames(css.tick, positionsClassNames)}
            style={{ transform, alignItems }}
          >
            {renderLine(isBottom || isRight)}
            <span className={classnames(css.text)}>{format(value)}</span>
            {renderLine(isTop || isLeft)}
          </div>
        )
      })}
    </div>
  )
}
