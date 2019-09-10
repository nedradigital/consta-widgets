import React from 'react'

import classnames from 'classnames'
import isNil from 'lodash/isNil'

import { ElementType } from '../SludgeBlock'

import css from './index.css'

type Props = {
  className?: string
  depth?: number
  elements?: ElementType[]
  isClickable?: boolean
  onClick?: () => void
}

export const SludgeTable: React.FC<Props> = ({
  className,
  depth,
  elements = [],
  isClickable,
  onClick,
}) => (
  <div
    className={classnames(css.table, { [css.isClickable]: isClickable }, className)}
    onClick={onClick}
  >
    {isClickable && <span className={css.openIcon}>+</span>}

    <div className={css.items}>
      {elements.length
        ? elements.map(({ name, value }) => (
            <div className={css.item} key={name}>
              <span className={css.value}>{value}%</span>
              <span className={css.name}>{name}</span>
            </div>
          ))
        : null}
    </div>
    <div className={css.depth}>{isNil(depth) ? '--' : depth} м</div>
  </div>
)
