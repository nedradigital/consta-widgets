import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const sizes = ['3xl', 'xl', 's', 'xs'] as const
export type Size = typeof sizes[number]

export type StyleProps = {
  size?: Size
  bold?: boolean
  uppercase?: boolean
  secondary?: boolean
}

type Props = {
  className?: string
  children: React.ReactNode
} & StyleProps

export const Title: React.FC<Props> = ({
  children,
  size = 's',
  className,
  secondary,
  uppercase,
  bold,
}) => (
  <div
    className={classnames(
      css.title,
      {
        '3xl': css.size3XL,
        xl: css.sizeXL,
        s: css.sizeS,
        xs: css.sizeXS,
      }[size],
      secondary && css.secondary,
      uppercase && css.uppercase,
      bold && css.bold,
      className
    )}
  >
    {children}
  </div>
)
