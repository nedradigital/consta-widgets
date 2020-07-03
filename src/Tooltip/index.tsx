import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
import { useTheme } from '@gpn-design/uikit/Theme'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { PortalWithTheme } from '@/core/PortalWithTheme'

import { getComputedPositionAndDirection } from './helpers'
import css from './index.css'
import { useTooltipReposition } from './use-tooltip-reposition'

export { useTooltipReposition }

const ARROW_SIZE = 6
const ARROW_OFFSET = 8

/**
 * Стороны упорядочены по приоритету:
 * Используется первая сторона, в которую смог вписаться тултип.
 */
export const directions = [
  'downCenter',
  'upCenter',

  'downRight',
  'downLeft',
  'upRight',
  'upLeft',

  'leftUp',
  'leftCenter',
  'leftDown',

  'rightUp',
  'rightCenter',
  'rightDown',
] as const

export type Direction = typeof directions[number]

export type Position = { x: number; y: number } | undefined

type AttachedToAnchor = {
  anchorRef: React.RefObject<HTMLElement>
  position?: never
}

export type AttachedToPosition = {
  anchorRef?: never
  position: Position
}

export type PositioningProps = AttachedToAnchor | AttachedToPosition

type Props = {
  isVisible: boolean
  direction?: Direction
  className?: string
  isContentHoverable?: boolean
  offset?: number
  withArrow?: boolean
  possibleDirections?: readonly Direction[]
} & PositioningProps &
  (
    | {
        children: React.ReactNode
      }
    | {
        renderContent: (direction: Direction) => React.ReactNode
      }
  )

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    isVisible,
    direction: passedDirection = 'upCenter',
    className,
    isContentHoverable,
    offset = 6,
    withArrow = true,
    possibleDirections = directions,
  } = props
  const passedPosition = 'position' in props ? props.position : undefined
  const anchorRef = 'anchorRef' in props ? props.anchorRef : undefined
  const mainRef = React.useRef<HTMLDivElement>(null)
  const { theme, themeClassNames } = useTheme()
  const [anchorClientRect, setAnchorClientRect] = React.useState<DOMRect | undefined>()
  const { width, height } = useComponentSize(mainRef)
  const anchorSize = useComponentSize(anchorRef || { current: null })
  const previousDirectionRef = React.useRef<Direction | null>(null)
  const { current: previousDirection } = previousDirectionRef
  const [bannedDirections, setBannedDirections] = React.useState<readonly Direction[]>([])

  const resetBannedDirections = () => {
    setBannedDirections(state => (state.length ? [] : state))
    previousDirectionRef.current = null
  }

  const updateAnchorClientRect = React.useCallback(
    () => setAnchorClientRect(anchorRef?.current?.getBoundingClientRect()),
    [anchorRef]
  )

  React.useLayoutEffect(() => {
    if (isVisible) {
      updateAnchorClientRect()
    }
  }, [updateAnchorClientRect, isVisible, anchorSize])

  useTooltipReposition({
    isActive: isVisible,
    scrollAnchorRef: anchorRef || { current: null },
    onRequestReposition: () => {
      resetBannedDirections()
      updateAnchorClientRect()
    },
  })

  const { position, direction } = getComputedPositionAndDirection({
    tooltipSize: { width, height },
    viewportSize: {
      // Размер вьюпорта без скроллбаров
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
    offset: offset + (withArrow ? ARROW_SIZE : 0),
    arrowOffset: withArrow ? ARROW_OFFSET + ARROW_SIZE : 0,
    direction: passedDirection,
    possibleDirections,
    bannedDirections,
    position: anchorClientRect
      ? { x: anchorClientRect.left, y: anchorClientRect.top }
      : passedPosition,
    anchorSize,
  })

  /**
   * Может возникнуть ситуация, когда перерасчет тултипа всегда будет выдавать 2 направления
   * и бесконечно зацикливать себя. Для избежания таких кейсов мы запоминаем стороны,
   * которые не подошли, чтобы не возвращаться к ним и предотвратить бесконечный ререндер.
   * См. TooltipBannedPositionsStory
   */
  if (previousDirection !== direction) {
    if (previousDirection && !bannedDirections.includes(previousDirection)) {
      setBannedDirections([...bannedDirections, previousDirection])
    }
    previousDirectionRef.current = direction
  }

  // Сбрасываем при любом изменении пропсов, чтобы заново начать перебор направлений
  // Главное не сбрасывать при изменении размеров тултипа, т.к. именно оно может вызвать бесконечный перебор
  React.useLayoutEffect(resetBannedDirections, [props])

  if (!isVisible) {
    return null
  }

  return (
    <PortalWithTheme theme={theme} container={window.document.body}>
      <div
        ref={mainRef}
        className={classnames(
          themeClassNames.color.invert,
          css.main,
          css[direction],
          isContentHoverable && css.isHoverable
        )}
        style={{
          top: (position?.y || 0) + window.scrollY,
          left: (position?.x || 0) + window.scrollX,
          visibility: position ? undefined : 'hidden',
          ['--arrow-size' as string]: `${ARROW_SIZE}px`,
          ['--arrow-offset' as string]: `${ARROW_OFFSET}px`,
        }}
      >
        <div ref={ref} className={classnames(css.tooltip, className)}>
          {withArrow && <div className={css.arrow} />}
          {'renderContent' in props ? (
            props.renderContent(direction)
          ) : (
            <Text as="div" size="xs" view="primary">
              {children}
            </Text>
          )}
        </div>
      </div>
    </PortalWithTheme>
  )
})
