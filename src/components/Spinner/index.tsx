import React from 'react'

import { classname } from '@/utils/classname'

import './index.css'

const cn = classname('spinner')

export enum SpinnerSize {
  s = 16,
  m = 32,
  l = 64,
}

type Props = {
  className?: string
  size?: SpinnerSize
}

export const Spinner: React.FC<Props> = ({ className, size = SpinnerSize.m }) => (
  <svg
    className={cn(null, null, className)}
    viewBox="25 25 50 50"
    style={{
      width: size,
      height: size,
    }}
  >
    <circle
      className={cn('path')}
      cx="50"
      cy="50"
      r="20"
      fill="none"
      strokeWidth="4"
      strokeMiterlimit="10"
    />
  </svg>
)
