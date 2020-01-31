import { createContext, useContext } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'

export const BaseSizeContext = createContext(16)

export const useBaseSize = () => {
  const baseSize = useContext(BaseSizeContext)
  const getCalculatedSizeWithBaseSize = (size: number) => getCalculatedSize(size, baseSize)

  return {
    baseSize,
    getCalculatedSizeWithBaseSize,
  }
}
