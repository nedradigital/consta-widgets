import { useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import classnames from 'classnames'

import { themeColorLight } from '@/utils/theme'
import { PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

import css from './index.css'

type Props = {
  anchorRef?: React.RefObject<HTMLDivElement>
  isWide?: boolean
  onClickOutside?: (event: MouseEvent) => void
}

export const Tooltip: React.FC<Props> = ({ children, anchorRef, isWide, onClickOutside }) => {
  const [position, setPosition] = useState<PositionState>()
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!anchorRef || !anchorRef.current) {
      return
    }

    const { left, bottom } = anchorRef.current.getBoundingClientRect()

    setPosition({ x: left, y: bottom })
  }, [anchorRef])

  useClickOutside([ref], event => {
    onClickOutside && onClickOutside(event)
  })

  if (!isDefinedPosition(position)) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={classnames(themeColorLight, css.main, isWide && css.isWide)}
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </div>,
    window.document.body
  )
}
