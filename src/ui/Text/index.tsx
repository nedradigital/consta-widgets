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
  croppedLineCount?: number
}

type Props = {
  className?: string
  children: React.ReactNode
} & StyleProps

export const Text: React.FC<Props> = ({
  children,
  size = 's',
  className,
  secondary,
  uppercase,
  bold,
  croppedLineCount,
}) => (
  <div
    className={classnames(
      css.main,
      {
        '3xl': css.size3XL,
        xl: css.sizeXL,
        s: css.sizeS,
        xs: css.sizeXS,
      }[size],
      secondary && css.isSecondary,
      uppercase && css.isUppercase,
      bold && css.isBold,
      Boolean(croppedLineCount) && css.isCropped,
      className
    )}
    style={{
      ['--line-clamp' as string]: croppedLineCount,
    }}
  >
    {children}
  </div>
)
