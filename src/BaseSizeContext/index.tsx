import React from 'react'

import { getCalculatedSize, updateBaseSize } from '@csssr/gpn-utils/lib/css'

import css from './index.css'

const BaseSizeContext = React.createContext(16)

export const BaseSizeProvider: React.FC<{ value: number }> = ({ value, children }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    updateBaseSize(value, ref.current)
  }, [value])

  return (
    <BaseSizeContext.Provider value={value}>
      <div ref={ref} className={css.main}>
        {children}
      </div>
    </BaseSizeContext.Provider>
  )
}

export const useBaseSize = () => {
  const baseSize = React.useContext(BaseSizeContext)
  const getCalculatedSizeWithBaseSize = (size: number) => getCalculatedSize(size, baseSize)

  return {
    baseSize,
    getCalculatedSizeWithBaseSize,
  }
}
