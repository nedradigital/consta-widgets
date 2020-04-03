import { getContentBorderRadius, getValueMaxFontSize, getValueMaxWidth } from '../helpers'

describe('getContentBorderRadius', () => {
  it('получение значения border-radius для необрезанного графика', () => {
    expect(getContentBorderRadius(50)).toEqual('50px')
  })

  it('получение значения border-radius для графика обрезанного сверху', () => {
    expect(getContentBorderRadius(50, 'top')).toEqual('0px 0px 50px 50px')
  })

  it('получение значение border-radius для графика обрезанного справа', () => {
    expect(getContentBorderRadius(50, 'right')).toEqual('50px 0px 0px 50px')
  })

  it('получение значения border-radius для графика обрезанного снизу', () => {
    expect(getContentBorderRadius(50, 'bottom')).toEqual('50px 50px 0px 0px')
  })

  it('получние значения border-radius для графика обрезанного слева', () => {
    expect(getContentBorderRadius(50, 'left')).toEqual('0px 50px 50px 0px')
  })
})

describe('getValueMaxFontSize', () => {
  describe('получение вычисленной максимальной высоты текста', () => {
    it('для необрезанного графика', () => {
      expect(getValueMaxFontSize({ diameter: 50, maxFontSize: 50 })).toEqual(25)
    })

    it('для графика обрезанного сверху', () => {
      expect(getValueMaxFontSize({ diameter: 50, maxFontSize: 50, position: 'top' })).toEqual(13)
    })

    it('для графика обрезанного справа', () => {
      expect(getValueMaxFontSize({ diameter: 50, maxFontSize: 50, position: 'right' })).toEqual(13)
    })

    it('для графика обрезанного снизу', () => {
      expect(getValueMaxFontSize({ diameter: 50, maxFontSize: 50, position: 'bottom' })).toEqual(13)
    })

    it('для графика обрезанного слева', () => {
      expect(getValueMaxFontSize({ diameter: 50, maxFontSize: 50, position: 'left' })).toEqual(13)
    })
  })

  describe('получение стандартной максимальной высоты текста', () => {
    it('для необрезанного графика', () => {
      expect(getValueMaxFontSize({ diameter: 100, maxFontSize: 10 })).toEqual(10)
    })

    it('для графика обрезанного сверху', () => {
      expect(getValueMaxFontSize({ diameter: 100, maxFontSize: 10, position: 'top' })).toEqual(10)
    })

    it('для графика обрезанного справа', () => {
      expect(getValueMaxFontSize({ diameter: 100, maxFontSize: 10, position: 'right' })).toEqual(10)
    })

    it('для графика обрезанного снизу', () => {
      expect(getValueMaxFontSize({ diameter: 100, maxFontSize: 10, position: 'bottom' })).toEqual(
        10
      )
    })

    it('для графика обрезанного слева', () => {
      expect(getValueMaxFontSize({ diameter: 100, maxFontSize: 10, position: 'left' })).toEqual(10)
    })
  })
})

describe('getValueMaxWidth', () => {
  it('получение максимальной ширины текста по расчету хорды окружности для необрезанного графика', () => {
    expect(getValueMaxWidth(100)).toEqual(undefined)
  })

  it('получение максимальной ширины текста по расчету хорды окружности для графика обрезанного сверху', () => {
    expect(getValueMaxWidth(100, 'top')).toEqual(64)
  })

  it('получение максимальной ширины текста по расчету хорды окружности для графика обрезанного справа', () => {
    expect(getValueMaxWidth(100, 'right')).toEqual(undefined)
  })

  it('получение максимальной ширины текста по расчету хорды окружности для графика обрезанного снизу', () => {
    expect(getValueMaxWidth(100, 'bottom')).toEqual(64)
  })

  it('получение максимальной ширины текста по расчету хорды окружности для графика обрезанного слева', () => {
    expect(getValueMaxWidth(100, 'left')).toEqual(undefined)
  })
})
