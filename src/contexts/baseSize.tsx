import React from 'react'

import { getCalculatedSize } from '@csssr/gpn-utils/lib/css'

export const BaseSizeContext = React.createContext(16)

export const useBaseSize = () => {
  const baseSize = React.useContext(BaseSizeContext)
  const getCalculatedSizeWithBaseSize = (size: number) => getCalculatedSize(size, baseSize)

  return {
    baseSize,
    getCalculatedSizeWithBaseSize,
  }
}
