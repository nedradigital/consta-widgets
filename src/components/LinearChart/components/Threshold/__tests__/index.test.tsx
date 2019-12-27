import { getFillPoints } from '../'

const maxPoints = [{ x: 0, y: 2 }, { x: 1, y: 2 }] as const
const minPoints = [{ x: 0, y: -2 }, { x: 1, y: -2 }] as const

describe('Линейный график / линии порога', () => {
  it('Получение координат заливки', () => {
    const result = getFillPoints(maxPoints, minPoints)
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 1, y: -2 }, { x: 0, y: -2 }, { x: 0, y: 2 }])
  })

  it('Получение пустых координат заливки если нет минимальных координат', () => {
    const result = getFillPoints(maxPoints)
    expect(result).toEqual([])
  })
})
