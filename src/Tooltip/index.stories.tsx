import { useRef, useState } from 'react'

import { Button } from '@gpn-design/uikit/Button'
import { boolean, number, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/common/storybook'
import { getStoryIds } from '@/common/utils/storybook'

import { directions, Position, Tooltip } from '.'

export const TooltipPositionedByCoordsStory = createStory(
  () => {
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    return (
      <>
        <div style={{ width: '200%', height: '200vh' }} onMouseMove={handleMouseMove} />
        <Tooltip
          isVisible={true}
          direction={select('direction', directions, 'upCenter')}
          position={position}
          offset={number('offset', 6)}
          withArrow={boolean('withArrow', true)}
        >
          {text('children', 'Hello, from Portal!')}
        </Tooltip>
      </>
    )
  },
  { name: 'с позиционированием по координатам' }
)

export const TooltipPositionedByAnchorStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    const handleClickOnAnchor = () => {
      setIsTooltipVisible(!isTooltipVisible)
    }

    return (
      <>
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            label="Кликай сюда"
            type="button"
            onClick={handleClickOnAnchor}
            innerRef={anchorRef}
          />
        </div>
        <Tooltip
          isVisible={isTooltipVisible}
          direction={select('direction', directions, 'left')}
          anchorRef={anchorRef}
          offset={number('offset', 6)}
          withArrow={boolean('withArrow', false)}
          isContentHoverable
        >
          {text('children', 'Hello, from Portal!')}
          {boolean('С интерактивным содержимым', false) && (
            <>
              <br />
              <input />
            </>
          )}
        </Tooltip>
      </>
    )
  },
  { name: 'с позиционированием по якорю' }
)

export const TooltipWithAutoClosingStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null)
    const tooltipRef = useRef(null)
    const [isTooltipVisible, setIsTooltipVisible] = useState(true)

    const handleClickOnAnchor = () => {
      setIsTooltipVisible(!isTooltipVisible)
    }

    return (
      <>
        <div
          style={{
            width: '100%',
            height: '200vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'var(--color-bg-alert)',
              cursor: 'pointer',
            }}
            onClick={handleClickOnAnchor}
            ref={anchorRef}
          >
            Кликай сюда
          </button>
        </div>
        <Tooltip
          ref={tooltipRef}
          isVisible={isTooltipVisible}
          anchorRef={anchorRef}
          isContentHoverable
        >
          Проскрольте окно вверх
        </Tooltip>
      </>
    )
  },
  { name: 'обновление позиции при скролле и ресайзе окна' }
)

/**
 * Стори для воспроизведения проблемы с бесконечным зацикливанием позиций тултипа:
 * Когда тултип пытается развернуться в upRight, то по размерам выходит, что он не влезает и его надо развернуть в left
 * Аналогично когда тултип пытается развернуться в left, то по размерам ему не хватает места и его надо развернуть в upRight
 */
export const TooltipBannedPositionsStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    const handleClickOnAnchor = () => {
      setIsTooltipVisible(!isTooltipVisible)
    }

    return (
      <>
        <div
          style={{
            width: '100%',
            height: '100vh',
          }}
        >
          <button
            type="button"
            style={{
              width: 100,
              height: 50,
              margin: 40,
              backgroundColor: 'var(--color-bg-alert)',
              cursor: 'pointer',
            }}
            onClick={handleClickOnAnchor}
            ref={anchorRef}
          >
            Кликай сюда
          </button>
        </div>
        <Tooltip
          isVisible={isTooltipVisible}
          anchorRef={anchorRef}
          offset={0}
          direction="upRight"
          possibleDirections={['upRight', 'left']}
          isContentHoverable
          renderContent={direction => (
            <div
              style={
                direction === 'upRight'
                  ? {
                      width: 10,
                      height: 50,
                    }
                  : {
                      width: 50,
                      height: 10,
                    }
              }
            >
              {direction}
            </div>
          )}
        />
      </>
    )
  },
  { name: 'предотвращение бесконечного цикла смены позиций' }
)

export default createMetadata({
  title: 'components/Tooltip',
  excludeStories:
    process.env.NODE_ENV === 'development'
      ? undefined
      : getStoryIds({ TooltipBannedPositionsStory }),
})
