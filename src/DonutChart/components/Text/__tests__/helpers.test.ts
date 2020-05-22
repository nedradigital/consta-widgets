import {
  getContentBorderRadius,
  getContentHeight,
  getValueHeightRatio,
  getValueMaxFontSize,
  getValueMaxWidth,
  VALUE_MAX_FONT_SIZE,
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

describe('getValueHeightRatio', () => {
  it('получение соотношения размера текста и высоты контента для необрезанного графика без заголовка', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: false,
      isHalfDonutVertical: false,
      titleIsExist: false,
    })

    expect(ratio).toEqual(0.5)
  })

  it('получение соотношения размера текста и высоты контента для необрезанного графика с заголовком', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: false,
      isHalfDonutVertical: false,
      titleIsExist: true,
    })

    expect(ratio).toEqual(0.5)
  })

  it('получение соотношения размера текста и высоты контента для обрезанного графика сверху или снизу без заголовка', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: true,
      isHalfDonutVertical: false,
      titleIsExist: false,
    })

    expect(ratio).toEqual(1)
  })

  it('получение соотношения размера текста и высоты контента для обрезанного графика сверху или снизу с заголовком', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: true,
      isHalfDonutVertical: false,
      titleIsExist: true,
    })

    expect(ratio).toEqual(0.5)
  })

  it('получение соотношения размера текста и высоты контента для обрезанного графика слева или справа без заголовка', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: false,
      isHalfDonutVertical: true,
      titleIsExist: false,
    })

    expect(ratio).toEqual(0.25)
  })

  it('получение соотношения размера текста и высоты контента для обрезанного графика слева или справа с заголовком', () => {
    const ratio = getValueHeightRatio({
      isHalfDonutHorizontal: false,
      isHalfDonutVertical: true,
      titleIsExist: true,
    })

    expect(ratio).toEqual(0.25)
  })
})

describe('getValueMaxFontSize', () => {
  it('получение максимального размера текста', () => {
    const size = getValueMaxFontSize({
      height: 100,
      ratio: 0.5,
    })

    expect(size).toEqual(50)
  })

  it('получение максимально возможного размера текста', () => {
    const size = getValueMaxFontSize({
      height: 100,
      ratio: 1,
    })

    expect(size).toEqual(VALUE_MAX_FONT_SIZE)
  })
})

describe('getValueMaxWidth', () => {
  it('получение максимальной ширины текста по расчету хорды окружности', () => {
    expect(getValueMaxWidth(100)).toEqual(57)
  })
})
