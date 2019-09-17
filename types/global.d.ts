import R from 'react'

import 'jest-enzyme'

declare global {
  const React: typeof R

  type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }
}
