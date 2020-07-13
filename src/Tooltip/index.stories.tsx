import { useRef, useState } from 'react'

import { Badge } from '@gpn-design/uikit/Badge'
import { Button } from '@gpn-design/uikit/Button'
import { Text } from '@gpn-design/uikit/Text'
import { boolean, number, optionsKnob, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { getStoryIds } from '@/common/utils/storybook'

import { directions, Position, sizes, Tooltip } from '.'

export const TooltipPositionedByCoordsStory = createStory(
  () => {
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    return (
      <>
        <div style={{ minWidth: '200%', height: '200vh' }} onMouseMove={handleMouseMove} />
        <Tooltip
          isVisible={true}
          size={select('size', sizes, 's')}
          direction={select('direction', directions, 'upCenter')}
          position={position}
          offset={number('offset', 6)}
          withArrow={boolean('withArrow', true)}
        >
          <Text size="xs">
            {text(
              'children',
              'Hello, from Portal! Hello, from Portal! Hello, from Portal! Hello, from Portal!'
            )}
          </Text>
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
    const anchorType = optionsKnob('Тип якоря', { Кнопка: 'button', Бэдж: 'badge ' }, 'button', {
      display: 'inline-radio',
    })
    const anchor =
      anchorType === 'button' ? (
        <Button
          label={text('Текст в кнопке', 'Кликай сюда')}
          type="button"
          onClick={handleClickOnAnchor}
          innerRef={anchorRef}
        />
      ) : (
        <Badge
          minified
          size={select('Размер бэджа', ['s', 'm', 'l'], 's')}
          onClick={handleClickOnAnchor}
          innerRef={anchorRef}
        />
      )

    React.useEffect(() => setIsTooltipVisible(false), [anchorType])

    return (
      <>
        {anchor}
        <Tooltip
          isVisible={isTooltipVisible}
          size={select('size', sizes, 's')}
          direction={select('direction', directions, 'leftCenter')}
          anchorRef={anchorRef}
          offset={number('offset', 6)}
          withArrow={boolean('withArrow', false)}
          isContentHoverable
        >
          <Text size="xs">{text('children', 'Hello, from Portal!')}</Text>
          {boolean('С интерактивным содержимым', false) && (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <input style={{ width: '100%', boxSizing: 'border-box' }} />
            </>
          )}
        </Tooltip>
      </>
    )
  },
  { name: 'с позиционированием по якорю' }
)

export const TooltipWithRepositionStory = createStory(
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
          size="m"
          isVisible={isTooltipVisible}
          anchorRef={anchorRef}
          isContentHoverable
        >
          <Text size="xs">Проскрольте окно вверх</Text>
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
          size="l"
          offset={0}
          direction="upRight"
          possibleDirections={['upRight', 'leftCenter']}
          isContentHoverable
        >
          {direction => (
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
        </Tooltip>
      </>
    )
  },
  { name: 'предотвращение бесконечного цикла смены позиций' }
)

export default createMetadata({
  title: 'components/Tooltip',
  decorators: [environmentDecorator()],
  excludeStories:
    process.env.NODE_ENV === 'development'
      ? undefined
      : getStoryIds({ TooltipBannedPositionsStory }),
})
