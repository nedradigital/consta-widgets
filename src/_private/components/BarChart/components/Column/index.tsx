import { isDefined, isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'
import { isNumber } from 'lodash'

import { FormatValue } from '@/_private/types'

import { Size } from '../../helpers'
import { Section } from '../Section'
import { TooltipData } from '../Tooltip'

import css from './index.css'

export type ColumnSize = Exclude<Size, 'auto'>

export type SectionItem = {
  color: string
  value?: number
  length?: number
}

export type OnMouseEnterColumn = (params: TooltipData) => void

type Props = {
  group: string
  total: number
  sections: readonly SectionItem[] | undefined
  size: ColumnSize
  showValues: boolean
  isHorizontal: boolean
  isReversed?: boolean
  isDense?: boolean
  activeGroup?: string
  activeSectionIndex?: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: number) => void
}

const sizeClasses: Record<ColumnSize, string> = {
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
  xl: css.sizeXL,
  '2xl': css.size2XL,
  '3xl': css.size3XL,
}

export const Column: React.FC<Props> = ({
  group,
  total,
  sections = [],
  size,
  showValues,
  isHorizontal,
  isReversed = false,
  isDense,
  activeGroup,
  activeSectionIndex,
  formatValueForLabel = String,
  onMouseEnterColumn,
  onMouseLeaveColumn,
  onChangeLabelSize,
}) => {
  const textRef = React.useRef<HTMLDivElement>(null)

  const handleMouseEnter: React.MouseEventHandler = event => {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return
    }
    const children = event.currentTarget.parentElement?.children || []
    const { left, top } = children[isHorizontal ? 0 : children.length - 1].getBoundingClientRect()
    const { height, width } = Array.from(children).reduce(
      (prev, element) =>
        isHorizontal
          ? {
              width: prev.width + element.getBoundingClientRect().width,
              height: element.getBoundingClientRect().height,
            }
          : {
              width: element.getBoundingClientRect().width,
              height: prev.height + element.getBoundingClientRect().height,
            },
      { width: 0, height: 0 }
    )

    const x = left + width / 2
    const y = top + height / 2
    const selectedSections = sections.filter(isDefined)

    onMouseEnterColumn({
      x,
      y,
      sections: isHorizontal ? selectedSections : [...selectedSections].reverse(),
    })
  }

  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    const isLastItem = isReversed ? index === 0 : index === sections.length - 1
    const isRounded = size !== 's' && !isDense && isLastItem
    const isColumnLabel = showValues && isLastItem
    const isSectionLabel = isNumber(activeSectionIndex) && activeSectionIndex === index
    const isActive =
      isSectionLabel ||
      (activeGroup && activeGroup === group) ||
      (!activeGroup && !isNumber(activeSectionIndex))

    const getLabel = () => {
      if (isColumnLabel && isNotNil(total)) {
        return formatValueForLabel(total)
      }

      if (isSectionLabel && isNotNil(item.value)) {
        return formatValueForLabel(item.value)
      }
    }

    return (
      <Section
        color={item.color}
        length={item.length}
        key={index}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isRounded={isRounded}
        isActive={isActive}
        label={getLabel()}
        labelRef={isColumnLabel ? textRef : undefined}
        onMouseEnter={handleMouseEnter}
      />
    )
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
      onMouseLeave={onMouseLeaveColumn}
    >
      {sections.map(renderSection)}
    </div>
  )
}
