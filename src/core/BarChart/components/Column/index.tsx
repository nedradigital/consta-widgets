import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { Text } from '@gpn-design/uikit/Text'
import classnames from 'classnames'

import { Size } from '../../helpers'
import { Section } from '../Section'

import css from './index.css'

export type ColumnSize = Exclude<Size, 'auto'>

export type SectionItem = {
  color: string
  value?: number
  length?: number
}

export type OnMouseEnterColumn = (params: {
  x: number
  y: number
  sections: readonly SectionItem[]
}) => void

type Props = {
  total: number
  sections: readonly SectionItem[] | undefined
  size: ColumnSize
  showValues: boolean
  isHorizontal: boolean
  isReversed?: boolean
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: number) => void
}

const sizeClasses: Record<ColumnSize, string> = {
  xxl: css.sizeXXL,
  xl: css.sizeXL,
  l: css.sizeL,
  m: css.sizeM,
  s: css.sizeS,
}

export const Column: React.FC<Props> = ({
  total,
  size,
  showValues,
  isHorizontal,
  isReversed = false,
  sections = [],
  onMouseEnterColumn,
  onMouseLeaveColumn,
  onChangeLabelSize,
}) => {
  const textRef = React.useRef<HTMLElement>(null)

  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    const isLastItem = isReversed ? index === 0 : index === sections.length - 1
    const isRounded = size !== 's' && isLastItem

    return (
      <Section
        color={item.color}
        length={item.length}
        key={index}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isRounded={isRounded}
      />
    )
  }

  const handleMouseEnter: React.MouseEventHandler = event => {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return
    }

    const { height, left, top, width } = event.currentTarget.getBoundingClientRect()

    const x = left + width / 2
    const y = top + height / 2
    const selectedSections = sections.filter(isDefined).reverse()

    onMouseEnterColumn({ x, y, sections: selectedSections })
  }

  React.useLayoutEffect(() => {
    if (textRef.current) {
      onChangeLabelSize && onChangeLabelSize(textRef.current.getBoundingClientRect().height)
    }
  }, [textRef, onChangeLabelSize])

  return (
    <div
      className={classnames(
        css.column,
        isHorizontal && css.isHorizontal,
        isReversed && css.isReversed,
        sizeClasses[size]
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeaveColumn}
    >
      {showValues && sections.length > 0 && (
        <Text innerRef={textRef} as="div" view="primary" className={css.label} size="xs">
          {total}
        </Text>
      )}
      {sections.map(renderSection)}
    </div>
  )
}
