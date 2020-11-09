import React from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'

import { LabelSize } from '../..'

import { getSize } from './helpers'
import css from './index.css'

type Props = {
  color: string
  length: number
  isHorizontal: boolean
  isReversed: boolean
  isRounded: boolean
  isActive: boolean
  label?: string
  className?: string
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onChangeLabelSize?: (size: LabelSize) => void
}

export const Section: React.FC<Props> = ({
  color,
  length,
  isHorizontal,
  isReversed,
  isRounded,
  isActive,
  label,
  className,
  onMouseEnter,
  onMouseLeave,
  onChangeLabelSize,
}) => {
  const labelRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!label || !labelRef.current) {
      return
    }

    const { width, height } = labelRef.current.getBoundingClientRect()

    onChangeLabelSize && onChangeLabelSize({ width: Math.round(width), height: Math.round(height) })
  }, [label, labelRef, onChangeLabelSize])

  return (
    <div
      className={classnames(
        css.section,
        isHorizontal && css.isHorizontal,
        isReversed && css.isReversed,
        isRounded && css.isRounded,
        isActive && css.isActive,
        className
      )}
      style={{
        ...getSize(length, isHorizontal),
        background: color,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label && (
        <Text ref={labelRef} as="div" view="primary" className={css.label} size="xs">
          {label}
        </Text>
      )}
    </div>
  )
}
