import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
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
  labelRef?: React.Ref<HTMLDivElement>
  onMouseEnter: React.MouseEventHandler
}

export const Section: React.FC<Props> = ({
  color,
  length,
  isHorizontal,
  isReversed,
  isRounded,
  isActive,
  label,
  labelRef,
  onMouseEnter,
}) => (
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
  >
    {(label || labelRef) && (
      <Text ref={labelRef} as="div" view="primary" className={css.label} size="xs">
        {label}
      </Text>
    )}
  </div>
)
