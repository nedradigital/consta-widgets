import React from 'react'

import { BASE_SIZE_PROPERTY_NAME, getCalculatedSize } from '@csssr/gpn-utils/lib/css'

import css from './index.css'

const BaseSizeContext = React.createContext(16)

export const updateBaseSize = (size: number, element: HTMLElement | SVGElement) => {
  element.style.setProperty(BASE_SIZE_PROPERTY_NAME, `${size}`)
}

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
