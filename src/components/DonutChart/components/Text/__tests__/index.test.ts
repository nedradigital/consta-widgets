import {
  getContentBorderRadius,
  getContentHeight,
  getValueMaxFontSize,
  getValueMaxWidth,
} from '../helpers'

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

describe('getContentHeight', () => {
  it('получение высоты контента для необрезанного графика', () => {
    expect(
      getContentHeight({
        diameter: 100,
        radius: 50,
        isHalfDonutHorizontal: false,
        isHalfDonutVertical: false,
        paddingFromBorder: 0,
        paddingFromLine: 20,
      })
    ).toEqual(60)
  })

  it('получение высоты контента для графика обрезанного сверху или снизу', () => {
    expect(
      getContentHeight({
        diameter: 100,
        radius: 50,
        isHalfDonutHorizontal: true,
        isHalfDonutVertical: false,
        paddingFromBorder: 0,
        paddingFromLine: 20,
      })
    ).toEqual(30)
  })

  it('получение высоты контента для графика обрезанного справа или слева', () => {
    expect(
      getContentHeight({
        diameter: 100,
        radius: 50,
        isHalfDonutHorizontal: false,
        isHalfDonutVertical: true,
        paddingFromBorder: 0,
        paddingFromLine: 20,
      })
    ).toEqual(80)
  })
})

describe('getValueMaxFontSize', () => {
  describe('получение вычисленной максимальной высоты текста', () => {
    it('для необрезанного графика', () => {
      expect(getValueMaxFontSize({ height: 50, maxFontSize: 50 })).toEqual(25)
    })

    it('для графика обрезанного сверху', () => {
      expect(getValueMaxFontSize({ height: 50, maxFontSize: 50, halfDonut: 'top' })).toEqual(25)
    })

    it('для графика обрезанного справа', () => {
      expect(getValueMaxFontSize({ height: 50, maxFontSize: 50, halfDonut: 'right' })).toEqual(13)
    })

    it('для графика обрезанного снизу', () => {
      expect(getValueMaxFontSize({ height: 50, maxFontSize: 50, halfDonut: 'bottom' })).toEqual(25)
    })

    it('для графика обрезанного слева', () => {
      expect(getValueMaxFontSize({ height: 50, maxFontSize: 50, halfDonut: 'left' })).toEqual(13)
    })
  })

  describe('получение стандартной максимальной высоты текста', () => {
    it('для необрезанного графика', () => {
      expect(getValueMaxFontSize({ height: 100, maxFontSize: 10 })).toEqual(10)
    })

    it('для графика обрезанного сверху', () => {
      expect(getValueMaxFontSize({ height: 100, maxFontSize: 10, halfDonut: 'top' })).toEqual(10)
    })

    it('для графика обрезанного справа', () => {
      expect(getValueMaxFontSize({ height: 100, maxFontSize: 10, halfDonut: 'right' })).toEqual(10)
    })

    it('для графика обрезанного снизу', () => {
      expect(getValueMaxFontSize({ height: 100, maxFontSize: 10, halfDonut: 'bottom' })).toEqual(10)
    })

    it('для графика обрезанного слева', () => {
      expect(getValueMaxFontSize({ height: 100, maxFontSize: 10, halfDonut: 'left' })).toEqual(10)
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
