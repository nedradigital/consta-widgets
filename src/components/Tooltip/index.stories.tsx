import { useRef, useState } from 'react'

import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { PositionState } from '@/utils/tooltips'

import { directions, Tooltip } from '.'

const TooltipPositionedByCoordsStory = () => {
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
}

const TooltipPositionedByAnchorStory = () => {
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
}

storiesOf('components/Tooltip', module)
  .add('с позиционированием по координатам', () => <TooltipPositionedByCoordsStory />)
  .add('с позиционированием по якорю', () => <TooltipPositionedByAnchorStory />)
