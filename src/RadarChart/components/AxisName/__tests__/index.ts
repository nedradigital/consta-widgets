import { getTransform } from '../'

describe('RadarChartAxisName', () => {
  describe('getTransform', () => {
    it('рассчитывает transform для верхней точки', () => {
      expect(getTransform(50, 0, 10)).toEqual(
        'translateX(-100%) translateX(0px) translateY(-100%) translateY(-10px)'
      )
    })

    it('рассчитывает transform для правой точки', () => {
      expect(getTransform(100, 50, 10)).toEqual(
        'translateX(0%) translateX(10px) translateY(-100%) translateY(0px)'
      )
    })

    it('рассчитывает transform для нижней точки', () => {
      expect(getTransform(50, 100, 10)).toEqual(
        'translateX(-100%) translateX(0px) translateY(0%) translateY(10px)'
      )
    })

    it('рассчитывает transform для левой точки', () => {
      expect(getTransform(0, 50, 10)).toEqual(
        'translateX(-100%) translateX(-10px) translateY(-100%) translateY(0px)'
      )
    })

    it('рассчитывает transform для верхней правой точки', () => {
      expect(getTransform(75, 25, 10)).toEqual(
        'translateX(0%) translateX(5px) translateY(-100%) translateY(-5px)'
      )
    })

    it('рассчитывает transform для нижней левой точки', () => {
      expect(getTransform(25, 75, 10)).toEqual(
        'translateX(-100%) translateX(-5px) translateY(0%) translateY(5px)'
      )
    })
  })
})
