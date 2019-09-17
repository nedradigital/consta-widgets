import React, { useState } from 'react'

import classNames from 'classnames'
import { last } from 'lodash'

import { SludgeDetails } from '../SludgeDetails'
import { SludgeTable } from '../SludgeTable'

import { getElementsComposition } from './utils'

export type ElementType = {
  name: string
  value: number
}

type IntervalType = {
  depthInterval: {
    top?: number
    bottom?: number
  }
  elements: readonly ElementType[]
}

export type GeologyIntervals = readonly IntervalType[]

type Props = {
  className?: string
  geologyIntervals?: GeologyIntervals
}

export const SludgeBlock: React.FC<Props> = ({ className, geologyIntervals = [] }) => {
  const [isOpened, changeIsOpened] = useState(false)
  const [selectedElements, changeSelectedElements] = useState<readonly string[]>([])

  const closeBlock = () => changeIsOpened(false)

  const openBlock = () => changeIsOpened(true)

  const toggleElementSelection = (element: string) => {
    selectedElements.includes(element) ? deselectElement(element) : selectElement(element)
  }

  const selectElement = (element: string) => {
    changeSelectedElements([...selectedElements, element])
  }

  const deselectElement = (element: string) => {
    changeSelectedElements(
      selectedElements.filter((selectedElement: string) => selectedElement !== element)
    )
  }

  const elementsComposition = getElementsComposition(geologyIntervals)
  const selectedElementsComposition = selectedElements.length
    ? elementsComposition.filter(({ name }) => selectedElements.includes(name))
    : elementsComposition.slice(0, 4)
  const lastInterval = last(geologyIntervals)
  const depth = lastInterval
    ? lastInterval.depthInterval && lastInterval.depthInterval.bottom
    : undefined
  const hasIntervals = Boolean(geologyIntervals.length)

  return (
    <div className={classNames(className)}>
      {isOpened ? (
        <SludgeDetails
          elements={elementsComposition}
          geologyIntervals={geologyIntervals}
          onCloseButtonClick={closeBlock}
          onElementCompositionClick={toggleElementSelection}
          selectedElements={selectedElements}
        />
      ) : (
        <SludgeTable
          depth={depth}
          elements={selectedElementsComposition}
          onClick={hasIntervals ? openBlock : undefined}
          isClickable={hasIntervals}
        />
      )}
    </div>
  )
}
