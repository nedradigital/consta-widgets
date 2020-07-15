import { useRef, useState } from 'react'

import { Badge } from '@gpn-design/uikit/Badge'
import { Button } from '@gpn-design/uikit/Button'
import { Text } from '@gpn-design/uikit/Text'
import { optionsKnob, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { directions } from '@/Popover'

import { Position, sizes, Tooltip } from '.'

const getCommonKnobs = () => ({
  size: select('size', sizes, 's'),
  direction: select('direction', directions, 'leftCenter'),
  children: <Text size="xs">{text('children', 'Текст тултипа')}</Text>,
})

export const TooltipPositionedByCoordsStory = createStory(
  () => {
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    return (
      <>
        <div style={{ minWidth: '100%', height: '100vh' }} onMouseMove={handleMouseMove} />
        <Tooltip {...getCommonKnobs()} position={position} />
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

    const commonKnobs = getCommonKnobs()

    return (
      <>
        {anchor}
        {isTooltipVisible && <Tooltip {...commonKnobs} anchorRef={anchorRef} />}
      </>
    )
  },
  { name: 'с позиционированием по якорю' }
)

export default createMetadata({
  title: 'components/Tooltip',
  decorators: [environmentDecorator()],
})
