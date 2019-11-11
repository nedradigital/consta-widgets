import { getTransform } from '../'

describe('RadarChartAxisName', () => {
  describe('getTransform', () => {
    it('calculates transform for the top point', () => {
      expect(getTransform(50, 0, 10)).toEqual(
        'translateX(-100%) translateX(0px) translateY(-100%) translateY(-10px)'
      )
    })

    it('calculates transform for the right point', () => {
      expect(getTransform(100, 50, 10)).toEqual(
        'translateX(0%) translateX(10px) translateY(-100%) translateY(0px)'
      )
    })

    it('calculates transform for the bottom point', () => {
      expect(getTransform(50, 100, 10)).toEqual(
        'translateX(-100%) translateX(0px) translateY(0%) translateY(10px)'
      )
    })

    it('calculates transform for the left point', () => {
      expect(getTransform(0, 50, 10)).toEqual(
        'translateX(-100%) translateX(-10px) translateY(-100%) translateY(0px)'
      )
    })

    it('calculates transform for the top right point', () => {
      expect(getTransform(75, 25, 10)).toEqual(
        'translateX(0%) translateX(5px) translateY(-100%) translateY(-5px)'
      )
    })

    it('calculate transform for the botttom left point', () => {
      expect(getTransform(25, 75, 10)).toEqual(
        'translateX(-100%) translateX(-5px) translateY(0%) translateY(5px)'
      )
    })
  })
})
