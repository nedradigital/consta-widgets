import {
  donutSize,
  getChartSize,
  getDonutRadius,
  getMinChartSize,
  getPadding,
  getSizeDonut,
  minChartSize,
  paddingBetweenDonuts,
} from '../helpers'

const LINES = [1, 2, 3] as const

describe('getChartSize', () => {
  it('получение размера графика', () => {
    expect(getChartSize({ width: 400, height: 200 })).toEqual(200)
  })

  it('получение размера графика обрезанного по вертикали', () => {
    expect(getChartSize({ width: 100, height: 200, halfDonut: 'right' })).toEqual(200)
    expect(getChartSize({ width: 100, height: 200, halfDonut: 'left' })).toEqual(200)
  })

  it('получение размера графика обрезанного по горизонтали', () => {
    expect(getChartSize({ width: 200, height: 100, halfDonut: 'top' })).toEqual(200)
    expect(getChartSize({ width: 200, height: 100, halfDonut: 'bottom' })).toEqual(200)
  })
})

describe('getMinChartSize', () => {
  it('получение минимального размера необрезанного графика без текста', () => {
    LINES.map(l => {
      expect(getMinChartSize(l)).toEqual(minChartSize[l])
    })
  })

  it('получение минимального размера необрезанного графика с 1 линией и текстом', () => {
    expect(getMinChartSize(1, true)).toEqual(75)
  })

  it('получение минимального размера необрезанного графика с 2 линиями и текстом', () => {
    expect(getMinChartSize(2, true)).toEqual(minChartSize[2])
  })

  it('получение минимального размера необрезанного графика с 3 линиями и текстом', () => {
    expect(getMinChartSize(3, true)).toEqual(minChartSize[3])
  })

  it('получение минимального размера обрезанного графика с 1 линией и текстом', () => {
    expect(getMinChartSize(1, true, 'top')).toEqual(143)
    expect(getMinChartSize(1, true, 'right')).toEqual(143)
    expect(getMinChartSize(1, true, 'bottom')).toEqual(143)
    expect(getMinChartSize(1, true, 'left')).toEqual(143)
  })

  it('получение минимального размера обрезанного графика с 2 линиями и текстом', () => {
    expect(getMinChartSize(2, true, 'top')).toEqual(minChartSize[2])
    expect(getMinChartSize(2, true, 'right')).toEqual(minChartSize[2])
    expect(getMinChartSize(2, true, 'bottom')).toEqual(minChartSize[2])
    expect(getMinChartSize(2, true, 'left')).toEqual(minChartSize[2])
  })

  it('получение минимального размера обрезанного графика с 3 линиями и текстом', () => {
    expect(getMinChartSize(3, true, 'top')).toEqual(minChartSize[3])
    expect(getMinChartSize(3, true, 'right')).toEqual(minChartSize[3])
    expect(getMinChartSize(3, true, 'bottom')).toEqual(minChartSize[3])
    expect(getMinChartSize(3, true, 'left')).toEqual(minChartSize[3])
  })
})

describe('getPadding', () => {
  it('получение размера отступа между линиями графика', () => {
    LINES.map(l => {
      expect(getPadding(l)).toEqual(paddingBetweenDonuts[l])
    })
  })
})

describe('getSizeDonut', () => {
  it('получение размера толщины линии графика', () => {
    LINES.map(l => {
      expect(getSizeDonut(l)).toEqual(donutSize[l])
    })
  })

  it('получение размера толщины линии обрезанного графика', () => {
    LINES.map(l => {
      expect(getSizeDonut(l, 'top')).toEqual(16)
      expect(getSizeDonut(l, 'right')).toEqual(16)
      expect(getSizeDonut(l, 'bottom')).toEqual(16)
      expect(getSizeDonut(l, 'left')).toEqual(16)
    })
  })
})

describe('getDonutRadius', () => {
  const MAIN_RADIUS = 500
  const COUNT_LINES = LINES.length

  it('получение размера радиуса первой линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 0, COUNT_LINES)).toEqual(500)
  })

  it('получение размера радиуса второй линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 1, COUNT_LINES)).toEqual(474)
  })

  it('получение размера радиуса третьей линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 2, COUNT_LINES)).toEqual(448)
  })
})
