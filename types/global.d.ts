import T from 'react-test-renderer'

import 'jest-extended'

declare global {
  const TestRenderer: typeof T
}
