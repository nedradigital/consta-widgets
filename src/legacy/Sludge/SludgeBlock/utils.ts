import { last, uniq } from 'lodash'

import { ElementType, GeologyIntervals } from '.'

const MAX_ELEMENTS_IN_COMPOSITION = 8

export const getElementsComposition = (
  geologyIntervals: GeologyIntervals
): readonly ElementType[] => {
  if (!geologyIntervals || !geologyIntervals.length) {
    return []
  }

  const allElements = geologyIntervals.reduce(
    (acc, { elements }) => [...acc, ...elements.map(({ name }) => name)],
    [] as readonly string[]
  )
  const uniqElements = uniq(allElements)
  const lastInterval = last(geologyIntervals)
  const lastIntarvalElements = lastInterval ? lastInterval.elements : []
  const elementsComposition = uniqElements
    .reduce(
      (acc, element) => {
        const elementInLastInterval = lastIntarvalElements.filter(el => el.name === element)[0]
        return [
          ...acc,
          {
            name: element,
            value: elementInLastInterval ? elementInLastInterval.value : 0,
          },
        ]
      },
      /* tslint:disable-next-line:readonly-array */
      [] as ElementType[]
    )
    .sort((el1, el2) => el2.value - el1.value)

  if (elementsComposition.length <= MAX_ELEMENTS_IN_COMPOSITION) {
    return elementsComposition
  }

  return elementsComposition.reduce(
    (acc, element, index) => {
      if (index + 1 <= MAX_ELEMENTS_IN_COMPOSITION) {
        return [...acc, element]
      }

      const lastAccElement = last(acc)
      const accWithoutLast = acc.slice(0, -1)

      return [
        ...accWithoutLast,
        {
          name: 'Другое',
          value: ((lastAccElement && lastAccElement.value) || 0) + element.value,
        },
      ]
    },
    [] as readonly ElementType[]
  )
}
