import { useRef, useState } from 'react'

import { boolean, number, select, text } from '@storybook/addon-knobs'

import { PositionState, useTooltipReposition } from '@/common/utils/tooltips'
import { createMetadata, createStory } from '@/common/utils/Storybook'

import { directions, Tooltip } from '.'

export const TooltipPositionedByCoordsStory = createStory(
  () => {
    const [position, setPosition] = useState<PositionState>({ x: 10, y: 10 })

    const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY })
    }

    return (
      <>
        <div style={{ width: '100%', height: '100vh' }} onMouseMove={handleMouseMove} />
        <Tooltip
          isVisible={true}
          direction={select('direction', directions, 'upCenter')}
          position={position}
          offset={number('offset', 0)}
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
    const [isTooltipVisible, setIsTooltipVisible] = useState(true)

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
          isVisible={isTooltipVisible}
          direction={select('direction', directions, 'left')}
          anchorRef={anchorRef}
          offset={number('offset', 5)}
          withArrow={boolean('withArrow', false)}
        >
          {text('children', 'Hello, from Portal!')}
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

    useTooltipReposition({
      isVisible: isTooltipVisible,
      anchorRef,
      onRequestReposition: () => setIsTooltipVisible(false),
    })

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
          <div
            style={{
              height: '2.2em',
              overflow: 'auto',
            }}
          >
            Попробуй поскроллить или поресайзить окно
            <br />
            Скролл внутри тултипа закрывать не должен
          </div>
        </Tooltip>
      </>
    )
  },
  { name: 'с автозакрытием при скролле и ресайзе окна' }
)

export default createMetadata({
  title: 'components/Tooltip',
})
