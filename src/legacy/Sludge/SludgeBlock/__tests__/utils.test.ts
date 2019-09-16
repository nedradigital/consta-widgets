import { getElementsComposition } from '../utils'

const geologyIntervals = [
  {
    depthInterval: { top: 10, bottom: 1000 },
    elements: [{ name: 'Песок', value: 100 }],
  },
  {
    depthInterval: { top: 1000, bottom: 1500 },
    elements: [
      { name: 'Песок', value: 70 },
      { name: 'Уголь', value: 15 },
      { name: 'Сланец', value: 15 },
    ],
  },
  {
    depthInterval: { top: 2434, bottom: 2436 },
    elements: [
      { name: 'Алевролит', value: 10 },
      { name: 'Песчаник', value: 5 },
      { name: 'Цемент', value: 80 },
      { name: 'Песок', value: 5 },
    ],
  },
] as const

const elementsComposition = [
  { name: 'Цемент', value: 80 },
  { name: 'Алевролит', value: 10 },
  { name: 'Песок', value: 5 },
  { name: 'Песчаник', value: 5 },
  { name: 'Уголь', value: 0 },
  { name: 'Сланец', value: 0 },
] as const

const moreThan8GeologyIntervals = [
  {
    depthInterval: { top: 1000, bottom: 1500 },
    elements: [
      { name: 'Песок', value: 20 },
      { name: 'Уголь', value: 15 },
      { name: 'Сланец', value: 15 },
    ],
  },
  {
    depthInterval: { top: 2434, bottom: 2436 },
    elements: [
      { name: 'Алевролит', value: 15 },
      { name: 'Песчаник', value: 6 },
      { name: 'Цемент', value: 10 },
      { name: 'Песок', value: 20 },
      { name: 'Материал 1', value: 5 },
      { name: 'Материал 2', value: 9 },
      { name: 'Материал 3', value: 8 },
      { name: 'Материал 4', value: 3 },
      { name: 'Материал 5', value: 5 },
      { name: 'Материал 6', value: 5 },
      { name: 'Материал 7', value: 7 },
      { name: 'Материал 8', value: 2 },
      { name: 'Материал 9', value: 4 },
      { name: 'Материал 10', value: 1 },
    ],
  },
] as const

const moreThan8ElementsComposition = [
  { name: 'Песок', value: 20 },
  { name: 'Алевролит', value: 15 },
  { name: 'Цемент', value: 10 },
  { name: 'Материал 2', value: 9 },
  { name: 'Материал 3', value: 8 },
  { name: 'Материал 7', value: 7 },
  { name: 'Песчаник', value: 6 },
  { name: 'Другое', value: 25 },
] as const

const moreThan8GeologyIntervals2 = [
  {
    depthInterval: { top: 10, bottom: 1000 },
    elements: [{ name: 'Песок', value: 100 }],
  },
  {
    depthInterval: { top: 1000, bottom: 1500 },
    elements: [
      { name: 'Песок', value: 20 },
      { name: 'Уголь', value: 15 },
      { name: 'Сланец', value: 15 },
      { name: 'Материал 1', value: 15 },
      { name: 'Материал 2', value: 15 },
      { name: 'Материал 3', value: 10 },
      { name: 'Материал 4', value: 10 },
    ],
  },
  {
    depthInterval: { top: 2434, bottom: 2436 },
    elements: [
      { name: 'Алевролит', value: 15 },
      { name: 'Песчаник', value: 5 },
      { name: 'Цемент', value: 80 },
      { name: 'Песок', value: 5 },
    ],
  },
] as const

const moreThan8ElementsComposition2 = [
  { name: 'Цемент', value: 80 },
  { name: 'Алевролит', value: 15 },
  { name: 'Песок', value: 5 },
  { name: 'Песчаник', value: 5 },
  { name: 'Уголь', value: 0 },
  { name: 'Сланец', value: 0 },
  { name: 'Материал 1', value: 0 },
  { name: 'Другое', value: 0 },
] as const

describe('Sludge block utils', () => {
  it('getElementsComposition should work', () => {
    expect(getElementsComposition(geologyIntervals)).toEqual(elementsComposition)
  })

  it('getElementsComposition should collapse more than 8 intervals in last interval', () => {
    expect(getElementsComposition(moreThan8GeologyIntervals)).toEqual(moreThan8ElementsComposition)
  })

  it('getElementsComposition should collapse more than 8 intervals', () => {
    expect(getElementsComposition(moreThan8GeologyIntervals2)).toEqual(
      moreThan8ElementsComposition2
    )
  })
})
