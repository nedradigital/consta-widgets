import React from 'react'

import classnames from 'classnames'

import { Size } from '../../helpers'
import { TooltipData } from '../Tooltip'

import css from './index.css'

export type ColumnSize = Exclude<Size, 'auto'>

export type SectionItem = {
  color: string
  value?: number
  length?: number
}

export type OnMouseEnterColumn = (params: TooltipData) => void

type Props = {
  isHorizontal: boolean
  isReversed?: boolean
  onMouseLeaveColumn: React.MouseEventHandler
}

export const Column: React.FC<Props> = ({
  isHorizontal,
  isReversed = false,
  onMouseLeaveColumn,
  children,
}) => {
  return (
    <div
      className={classnames(
        css.column,
        isHorizontal && css.isHorizontal,
        isReversed && css.isReversed
      )}
      onMouseLeave={onMouseLeaveColumn}
    >
      {children}
    </div>
  )
}
