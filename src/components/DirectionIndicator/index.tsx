import React from 'react'

import classnames from 'classnames'

import directionImage from './images/i-direction.gif'
import css from './index.css'

export const directions = ['down', 'up'] as const

type DirectionIndicatorPropsType = {
  className?: string
  direction: typeof directions[number]
}

export const DirectionIndicator = ({ className, direction }: DirectionIndicatorPropsType) => (
  <img
    className={classnames(
      css.directionIndicator,
      {
        up: css.up,
        down: null,
      }[direction],
      className
    )}
    src={directionImage}
    alt={direction}
  />
)
