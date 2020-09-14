import React from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'

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
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onChangeLabelSize?: (size: number) => void
}

export const Section: React.FC<Props> = ({
  color,
  length,
  isHorizontal,
  isReversed,
  isRounded,
  isActive,
  label,
  onMouseEnter,
  onMouseLeave,
  onChangeLabelSize,
}) => {
  const labelRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!label || !labelRef.current) {
      return
    }

    onChangeLabelSize && onChangeLabelSize(labelRef.current.getBoundingClientRect().height)
  }, [label, labelRef, onChangeLabelSize])

  return (
    <div
      className={classnames(
        css.section,
        isHorizontal && css.isHorizontal,
        isReversed && css.isReversed,
        isRounded && css.isRounded,
        isActive && css.isActive
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
