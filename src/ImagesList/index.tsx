import { useLayoutEffect, useRef, useState } from 'react'

import { Button } from '@gpn-design/uikit/Button'
import { IconArrowLeft } from '@gpn-design/uikit/IconArrowLeft'
import { IconArrowRight } from '@gpn-design/uikit/IconArrowRight'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import * as _ from 'lodash'

import css from './index.css'

export type ImageItem = {
  preview?: string
  large: string
}

type Props = {
  images: readonly ImageItem[]
  activeItem?: number
  onClick: (idx: number) => void
}

export const ImagesList: React.FC<Props> = ({ images, activeItem, onClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { width: wrapperWidth } = useComponentSize(wrapperRef)
  const [offset, setOffset] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)

  useLayoutEffect(() => {
    setScrollWidth(listRef.current!.scrollWidth)
  }, [wrapperWidth, images])

  useLayoutEffect(() => {
    const maxOffset = scrollWidth - wrapperWidth
    const clampedOffset = _.clamp(offset, 0, maxOffset)
    if (clampedOffset !== offset) {
      setOffset(clampedOffset)
    }
  }, [offset, scrollWidth, wrapperWidth])

  const handleMove = (direction: 'left' | 'right') => () => {
    const toRight = direction === 'right'

    setOffset(toRight ? offset + wrapperWidth : offset - wrapperWidth)
  }

  return (
    <div className={css.main}>
      {offset > 0 && (
        <Button
          size="s"
          onlyIcon
          iconLeft={IconArrowLeft}
          iconSize="s"
          className={classnames(css.button, css.toLeft)}
          onClick={handleMove('left')}
          view="ghost"
        />
      )}
      <div className={css.wrapper} ref={wrapperRef}>
        <div
          ref={listRef}
          className={css.list}
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {images.map((image, idx) => (
            <button
              key={idx}
              type="button"
              className={classnames(css.item, idx === activeItem && css.isActive)}
              onClick={() => onClick(idx)}
            >
              <img src={image.preview || image.large} className={css.image} />
            </button>
          ))}
        </div>
      </div>
      {offset + wrapperWidth < scrollWidth && (
        <Button
          size="s"
          onlyIcon
          iconLeft={IconArrowRight}
          iconSize="s"
          className={classnames(css.button, css.toRight)}
          onClick={handleMove('right')}
          view="ghost"
        />
      )}
    </div>
  )
}
