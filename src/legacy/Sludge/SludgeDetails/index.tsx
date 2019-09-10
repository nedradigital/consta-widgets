import React, { useState } from 'react'

import classnames from 'classnames'
import isNil from 'lodash/isNil'

import { ElementType, GeologyIntervals } from '../SludgeBlock'
import { SludgeChart } from '../SludgeChart'

import css from './index.css'

type CommonProps = {
  onElementCompositionClick: (name: string) => void
  selectedElements: string[]
  elements?: ElementType[]
}

type Props = {
  className?: string
  geologyIntervals?: GeologyIntervals
  onCloseButtonClick?: () => void
} & CommonProps

type ListProps = {
  setHoveredElement: React.Dispatch<React.SetStateAction<string>>
} & CommonProps

const Stub = () => (
  <div className={classnames(css.composition, css.noHover)}>
    <span className={css.selectionIndicator} />
    <div className={css.compositionContent}>
      <span className={css.name}>--</span>
      <span className={css.value}>--</span>
    </div>
  </div>
)

const List: React.FC<ListProps> = ({
  elements = [],
  onElementCompositionClick,
  setHoveredElement,
  selectedElements,
}) => (
  <>
    {elements.map(({ name, value }) => {
      const isSelected = selectedElements.includes(name)

      return (
        <div
          className={css.composition}
          key={name}
          onClick={() => onElementCompositionClick(name)}
          onMouseEnter={() => setHoveredElement(name)}
          onMouseLeave={() => setHoveredElement('')}
        >
          <span
            className={classnames(css.selectionIndicator, {
              [css.selected]: isSelected,
            })}
          />
          <div className={css.compositionContent}>
            <span className={css.name}>{name || '--'}</span>
            <span className={css.value}>{isNil(value) ? '--' : value}%</span>
          </div>
        </div>
      )
    })}
  </>
)

export const SludgeDetails: React.FC<Props> = ({
  className,
  elements = [],
  geologyIntervals = [],
  onCloseButtonClick,
  onElementCompositionClick,
  selectedElements,
}) => {
  const [hoveredElement, setHoveredElement] = useState('')

  return (
    <div className={classnames(css.details, className)}>
      <span className={css.closeIcon} onClick={onCloseButtonClick} />

      <div className={css.chart}>
        <SludgeChart
          elements={elements}
          geologyIntervals={geologyIntervals}
          hoveredElement={hoveredElement}
        />
      </div>
      <div className={css.compositions}>
        {elements.length ? (
          <List
            elements={elements}
            onElementCompositionClick={onElementCompositionClick}
            selectedElements={selectedElements}
            setHoveredElement={setHoveredElement}
          />
        ) : (
          <Stub />
        )}
      </div>
    </div>
  )
}
