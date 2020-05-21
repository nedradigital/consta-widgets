import { useEffect, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { IconArrowLeft, IconArrowRight, IconClose } from '@gpn-design/uikit'
import classnames from 'classnames'
import * as _ from 'lodash'

import { Image } from '@/Image'
import { ImageItem, ImagesList } from '@/ImagesList'

import css from './index.css'

type Props = {
  images: readonly ImageItem[]
  openOnImage?: number
  onRequestClose: () => void
}

export const ImagesPopup: React.FC<Props> = ({ images, openOnImage, onRequestClose }) => {
  const isVisible = openOnImage !== undefined
  const [currentImageIdx, setCurrentImageIdx] = useState(openOnImage || 0)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    // Чтобы выключить анимации в момент открытия
    if (isVisible) {
      setIsOpening(true)
      requestAnimationFrame(() => setIsOpening(false))
    }
  }, [isVisible])

  useEffect(() => {
    if (openOnImage !== undefined && openOnImage !== currentImageIdx) {
      setCurrentImageIdx(openOnImage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOnImage])

  useLayoutEffect(() => {
    const clampedIdx = _.clamp(currentImageIdx, 0, images.length - 1)
    if (clampedIdx !== currentImageIdx) {
      setCurrentImageIdx(clampedIdx)
    }
  }, [currentImageIdx, images])

  const goLeft = () => setCurrentImageIdx(currentImageIdx - 1)
  const goRight = () => setCurrentImageIdx(currentImageIdx + 1)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape': {
        return onRequestClose()
      }
      case 'ArrowLeft': {
        return goLeft()
      }
      case 'ArrowRight': {
        return goRight()
      }
    }
  }

  return ReactDOM.createPortal(
    <div
      className={classnames(css.main, isVisible && css.isVisible, isOpening && css.isOpening)}
      tabIndex={-1}
      onKeyDown={handleKeyPress}
    >
      <div className={css.content}>
        <div
          className={css.items}
          style={{
            transform: `translateX(${-1 * currentImageIdx * 100}%)`,
          }}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className={css.item}
              style={{
                left: `${idx * 100}%`,
              }}
            >
              <Image src={image.large} />
            </div>
          ))}
        </div>
        <div className={css.preview}>
          <ImagesList images={images} activeItem={currentImageIdx} onClick={setCurrentImageIdx} />
        </div>
        {currentImageIdx > 0 && (
          <button type="button" className={classnames(css.button, css.toLeft)} onClick={goLeft}>
            <IconArrowLeft size="m" />
          </button>
        )}
        {currentImageIdx < images.length - 1 && (
          <button type="button" className={classnames(css.button, css.toRight)} onClick={goRight}>
            <IconArrowRight size="m" />
          </button>
        )}
        <button
          type="button"
          className={classnames(css.button, css.close)}
          onClick={onRequestClose}
        >
          <IconClose size="m" />
        </button>
      </div>
    </div>,
    window.document.body
  )
}
