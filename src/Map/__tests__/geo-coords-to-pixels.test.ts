import { Coords } from '..'
import { geoCoordsToPixels } from '../helpers'

const projection = jest.fn((coords: Coords) => {
  if (coords.every(coord => coord >= 0)) {
    return coords
  }

  return null
})

describe('geoCoordsToPixels', () => {
  it('преобразование координат к пикселям на экране', () => {
    expect(geoCoordsToPixels(projection, [0, 0])).toEqual({ x: 0, y: 0 })
  })

  it('возвращает undefined в случае ошибки преобразования координат', () => {
    expect(geoCoordsToPixels(projection, [-1000, -1000])).toEqual(undefined)
  })
})
