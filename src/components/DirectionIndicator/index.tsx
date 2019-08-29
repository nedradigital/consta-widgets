import React from 'react'

import classnames from 'classnames'

import directionImage from './images/i-direction.gif'
import css from './index.css'

type DirectionIndicatorPropsType = {
  className?: string
  direction: 'down' | 'up'
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
