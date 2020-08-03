import { scaleZoom, translateZoom } from '../helpers'

describe('scaleZoom', () => {
  it('приближает x1 -> х2', () => {
    expect(scaleZoom([0, 1], 2)).toEqual([0.25, 0.75])
  })

  it('отдаляет x2 -> x1', () => {
    expect(scaleZoom([0.25, 0.75], 1)).toEqual([0, 1])
  })

  it('отдалят x2 -> x1, когда зум сдвинут', () => {
    expect(scaleZoom([0.4, 0.9], 1)).toEqual([0, 1])
  })

  it('приближает x1 -> x4', () => {
    expect(scaleZoom([0, 1], 4)).toEqual([0.375, 0.625])
  })

  it('приближает x2 -> x4', () => {
    expect(scaleZoom([0.25, 0.75], 4)).toEqual([0.375, 0.625])
  })

  it('приближает x2 -> x4, когда зум сдвинут', () => {
    expect(scaleZoom([0.55 - 0.25, 0.55 + 0.25], 4)).toEqual([0.55 - 0.125, 0.55 + 0.125])
  })

  it('отдаляет x4 -> x2', () => {
    expect(scaleZoom([0.375, 0.625], 2)).toEqual([0.25, 0.75])
  })

  it('отдаляет x4 -> x2, когда зум сдвинут', () => {
    expect(scaleZoom([0.6 - 0.125, 0.6 + 0.125], 2)).toEqual([0.6 - 0.25, 0.6 + 0.25])
  })

  it('отдаляет x4 -> x2, когда зум в крайнем правом положении', () => {
    expect(scaleZoom([0.75, 1], 2)).toEqual([0.5, 1])
  })

  it('отдаляет x4 -> x2, когда зум в крайнем левом положении', () => {
    expect(scaleZoom([0, 0.25], 2)).toEqual([0, 0.5])
  })

  it('приближает x1 -> x50', () => {
    expect(scaleZoom([0, 1], 50)).toEqual([0.49, 0.51])
  })
})

describe('translateZoom', () => {
  it('свдигает зум вправо', () => {
    expect(translateZoom([0.25, 0.75], 0.05)).toEqual([0.3, 0.8])
  })

  it('не даёт сдвинуть зум за пределы правой границы', () => {
    expect(translateZoom([0.25, 0.75], 0.9)).toEqual([0.5, 1])
  })

  it('свдигает зум влево', () => {
    expect(translateZoom([0.25, 0.75], -0.05)).toEqual([0.2, 0.7])
  })

  it('не даёт сдвинуть зум за пределы левой границы', () => {
    expect(translateZoom([0.25, 0.75], -0.9)).toEqual([0, 0.5])
  })
})
