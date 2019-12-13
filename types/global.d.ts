import R from 'react'

import 'jest-enzyme'
import 'jest-extended'

declare global {
  const React: typeof R

  type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }
}
