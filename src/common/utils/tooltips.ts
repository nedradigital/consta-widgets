import React, { RefObject } from 'react'

import { getAllParents } from './dom'

export type Position = {
  x: number
  y: number
}

export type PositionState = Position | Partial<Position> | undefined

/* istanbul ignore next */
/** Запрос репозиции тултипа при ресайзе окна и скролле */
export const useTooltipReposition = ({
  isVisible,
  anchorRef,
  onRequestReposition,
}: {
  isVisible: boolean
  /** При скролле родителей этого элемента будет запрашиваться репозиция тултипа */
  anchorRef: RefObject<HTMLElement | null>
  onRequestReposition: () => void
}) => {
  React.useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', onRequestReposition)

      const allParents = anchorRef.current ? getAllParents(anchorRef.current) : []
      allParents.forEach(parentEl => parentEl.addEventListener('scroll', onRequestReposition))

      return () => {
        window.removeEventListener('resize', onRequestReposition)

        allParents.forEach(parentEl => parentEl.removeEventListener('scroll', onRequestReposition))
      }
    }
  }, [isVisible, anchorRef, onRequestReposition])
}
