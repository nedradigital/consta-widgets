import React from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'

import { ColumnProperty } from '@/_private/components/BarChart/components/Column'

import { LabelSize } from '../..'

import { getRoundedBorder, getSize } from './helpers'
import css from './index.css'

type Props = {
  color: string
  length: number
  isHorizontal: boolean
  isReversed: boolean
  isActive: boolean
  label?: string
  className?: string
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onChangeLabelSize?: (size: LabelSize) => void
  columnProperty: ColumnProperty
}

export const Section = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      color,
      length,
      isHorizontal,
      isReversed,
      isActive,
      label,
      className,
      onMouseEnter,
      onMouseLeave,
      onChangeLabelSize,
      columnProperty,
    },
    ref
  ) => {
    const labelRef = React.useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
      if (!label || !labelRef.current) {
        return
      }

      const { width, height } = labelRef.current.getBoundingClientRect()

      onChangeLabelSize &&
        onChangeLabelSize({ width: Math.round(width), height: Math.round(height) })
    }, [label, labelRef, onChangeLabelSize])

    return (
      <div
        ref={ref}
        className={classnames(
          css.section,
          isHorizontal && css.isHorizontal,
          isReversed && css.isReversed,
          isActive && css.isActive,
          className
        )}
        style={{
          ...getSize(length, isHorizontal),
          ...getRoundedBorder(columnProperty, isHorizontal),
          background: length > 0 ? color : 'rgba(0,0,0,0)',
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
)
