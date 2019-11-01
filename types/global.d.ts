import R from 'react'

import 'jest-enzyme'
import 'jest-extended'

import { IResizeObserver } from './resize-observer'

declare global {
  const React: typeof R
  const ResizeObserver: IResizeObserver

  type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }
}
