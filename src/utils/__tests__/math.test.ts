import { deg2rad } from '../math'

describe('deg2rad', () => {
  it('преобразует координаты к радианам', () => {
    expect(deg2rad(180)).toEqual(Math.PI)
  })
})
