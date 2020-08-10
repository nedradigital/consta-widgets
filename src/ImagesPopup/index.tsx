import { useEffect, useLayoutEffect, useState } from 'react'

import { Button } from '@gpn-design/uikit/Button'
import { IconArrowLeft } from '@gpn-design/uikit/IconArrowLeft'
import { IconArrowRight } from '@gpn-design/uikit/IconArrowRight'
import { IconClose } from '@gpn-design/uikit/IconClose'
import { PortalWithTheme } from '@gpn-design/uikit/PortalWithTheme'
import { useTheme } from '@gpn-design/uikit/Theme'
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
  const { theme } = useTheme()

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

  return (
    <PortalWithTheme preset={theme}>
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
            <Button
              className={css.toLeft}
              size="s"
              view="clear"
              onlyIcon
              iconLeft={IconArrowLeft}
              iconSize="m"
              onClick={goLeft}
            />
          )}
          {currentImageIdx < images.length - 1 && (
            <Button
              className={css.toRight}
              size="s"
              view="clear"
              onlyIcon
              iconLeft={IconArrowRight}
              iconSize="m"
              disabled={currentImageIdx === images.length - 1}
              onClick={goRight}
            />
          )}
          <Button
            className={css.close}
            size="l"
            view="clear"
            onlyIcon
            iconLeft={IconClose}
            onClick={onRequestClose}
          />
        </div>
      </div>
    </PortalWithTheme>
  )
}
