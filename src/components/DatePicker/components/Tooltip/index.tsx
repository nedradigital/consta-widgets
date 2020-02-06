import { useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from '@gaz/utils/lib/use-click-outside'
import classnames from 'classnames'

import css from './index.css'

type Props = {
  anchorRef?: React.RefObject<HTMLDivElement>
  isWide?: boolean
  onClickOutside?: (event: MouseEvent) => void
}

export const Tooltip: React.FC<Props> = ({ children, anchorRef, isWide, onClickOutside }) => {
  const [position, setPosition] = useState<{ x?: number; y?: number }>({
    x: undefined,
    y: undefined,
  })
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

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={classnames(css.main, isWide && css.isWide)}
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </div>,
    window.document.body
  )
}
