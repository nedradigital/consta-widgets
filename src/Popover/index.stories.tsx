import { useRef, useState } from 'react'

import { Button } from '@gpn-design/uikit/Button'
import { Text } from '@gpn-design/uikit/Text'
import { boolean, number, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { getStoryIds } from '@/common/utils/storybook'

import { directions, Popover, Position } from '.'

const getCommonKnobs = () => ({
  direction: select('direction', directions, 'upCenter'),
  offset: number('offset', 0),
  arrowOffset: number('arrowOffset', 0),
})

const getText = () => <Text size="xs">{text('children', 'Контент поповера')}</Text>

const PopoverContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <div
    {...rest}
    style={{
      padding: 'var(--space-s)',
      background: 'var(--color-bg-secondary)',
      ...rest.style,
    }}
  >
    {children}
  </div>
)

const PopoverPositionedByCoordsStoryContent = () => {
  const [position, setPosition] = useState<Position>(undefined)

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <>
      <div style={{ width: '200%', height: '200vh' }} onMouseMove={handleMouseMove} />
      <Popover {...getCommonKnobs()} position={position} isInteractive={false}>
        <PopoverContent>{getText()}</PopoverContent>
      </Popover>
    </>
  )
}

export const PopoverPositionedByCoordsStory = createStory(
  () => <PopoverPositionedByCoordsStoryContent />,
  { name: 'с позиционированием по координатам' }
)

const PopoverPositionedByAnchorStoryContent = () => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const handleClickOnAnchor = () => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  const commonKnobs = getCommonKnobs()

  const withInteractiveContent = boolean('С интерактивным содержимым', false)

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
      {isPopoverVisible && (
        <Popover {...commonKnobs} anchorRef={anchorRef}>
          <PopoverContent>
            {getText()}
            {withInteractiveContent && (
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
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}

export const PopoverPositionedByAnchorStory = createStory(
  () => <PopoverPositionedByAnchorStoryContent />,
  { name: 'с позиционированием по якорю' }
)

export const PopoverWithRepositionStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null)

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
          <Button label="Кнопка-якорь" type="button" innerRef={anchorRef} />
        </div>
        <Popover anchorRef={anchorRef}>
          <PopoverContent>
            <Text size="xs">Проскрольте окно вверх до конца</Text>
          </PopoverContent>
        </Popover>
      </>
    )
  },
  { name: 'обновление позиции при скролле окна' }
)

/**
 * Стори для воспроизведения проблемы с бесконечным зацикливанием позиций поповера:
 * Когда поповер пытается развернуться в upRight, то по размерам выходит, что он не влезает и его надо развернуть в left
 * Аналогично когда поповер пытается развернуться в left, то по размерам ему не хватает места и его надо развернуть в upRight
 */
const PopoverBannedPositionsStoryContent = () => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const handleClickOnAnchor = () => {
    setIsPopoverVisible(!isPopoverVisible)
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
      {isPopoverVisible && (
        <Popover
          anchorRef={anchorRef}
          offset={0}
          direction="upRight"
          possibleDirections={['upRight', 'leftCenter']}
        >
          {direction => (
            <PopoverContent
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
            </PopoverContent>
          )}
        </Popover>
      )}
    </>
  )
}

export const PopoverBannedPositionsStory = createStory(
  () => <PopoverBannedPositionsStoryContent />,
  { name: 'предотвращение бесконечного цикла смены позиций' }
)

export default createMetadata({
  title: 'components/Popover',
  excludeStories:
    process.env.NODE_ENV === 'development'
      ? undefined
      : getStoryIds({ PopoverBannedPositionsStory }),
  decorators: [environmentDecorator()],
})
