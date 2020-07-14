import R from 'react'
import T from 'react-test-renderer'

import 'jest-extended'

declare global {
  const React: typeof R
  const TestRenderer: typeof T
}
