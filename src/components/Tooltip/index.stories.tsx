import { useState } from 'react'

import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { PositionState } from '@/utils/tooltips'

import { horizontalDirections, Tooltip, verticalDirections } from '.'

const TooltipStory = () => {
  const [position, setPosition] = useState<PositionState>({ x: 10, y: 10 })

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.pageX, y: event.pageY })
  }

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} onMouseMove={handleMouseMove} />
      <Tooltip
        isVisible={true}
        horizontalDirection={select('horizontalDirection', horizontalDirections, 'center')}
        verticalDirection={select('verticalDirection', verticalDirections, 'top')}
        position={position}
      >
        {text('children', 'Hello, from Portal!')}
      </Tooltip>
    </>
  )
}

storiesOf('components/Tooltip', module).add('interactive', () => <TooltipStory />)
