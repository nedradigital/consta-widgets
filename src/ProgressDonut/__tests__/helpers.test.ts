import {
  DEFAULT_EMPTY_COLOR,
  getColorGroups,
  getData,
  getMinChartSize,
  getTextData,
  getValuePercent,
} from '../helpers'

describe('getColorGroups', () => {
  it('возвращает группу цветов для значения меньше 100', () => {
    expect(getColorGroups(['blue', 'red'], 'title', { value: 20 })).toEqual({
      title: 'blue',
      empty: DEFAULT_EMPTY_COLOR,
    })
  })

  it('возвращает группу с цветами при значении больше 100', () => {
    expect(getColorGroups(['blue', 'red'], 'title', { value: 120 })).toEqual({
      title: 'red',
      empty: 'blue',
    })
  })

  it('возвращает группу с цветами при значении больше 100 и количестве цветов больше 2-х', () => {
    expect(getColorGroups(['blue', 'red', 'green'], 'title', { value: 201 })).toEqual({
      title: 'green',
      empty: 'red',
    })
  })
})

describe('getData', () => {
  it('возвращает данные для пончика', () => {
    expect(
      getData('title', {
        value: 70,
      })
    ).toEqual([
      {
        name: 'title',
        colorGroupName: 'title',
        values: [70],
      },
      {
        name: 'empty',
        colorGroupName: 'empty',
        values: [30],
      },
    ])
  })

  it('для пончика обрезанного сверху или справа возвращает данные в обратном порядке', () => {
    expect(getData('', { value: 10 }, 'top')[0].name).toBe('empty')
    expect(getData('', { value: 10 }, 'right')[0].name).toBe('empty')
  })

  it('возвращает данные для пустого пончика при отсутствии значения', () => {
    expect(getData('title', {})).toEqual([
      {
        name: 'title',
        colorGroupName: 'title',
        values: [0],
      },
      {
        name: 'empty',
        colorGroupName: 'empty',
        values: [100],
      },
    ])
  })

  it('возвращает данные для заполненного пончика при значении кратном 100', () => {
    expect(getData('title', { value: 300 })).toEqual([
      {
        name: 'title',
        colorGroupName: 'title',
        values: [100],
      },
      {
        name: 'empty',
        colorGroupName: 'empty',
        values: [0],
      },
    ])
  })
})

describe('getTextData', () => {
  it('возвращает значение в процентах', () => {
    expect(
      getTextData('title', {
        value: 100,
        valueMin: 0,
        valueMax: 300,
      })
    ).toEqual({ value: '33%', title: 'title' })
  })

  it('возвращает плейсхолдер при отсутствии значения', () => {
    expect(getTextData('title', { valuePlaceholder: '--' })).toEqual({
      value: '--',
      title: 'title',
    })
  })

  it('возвращает пустую строку при отсутствии плейсхолдера и значения', () => {
    expect(getTextData('title')).toEqual({
      value: '',
      title: 'title',
    })
  })
})

describe('getValuePercent', () => {
  it('возвращает значение от 0 до 100', () => {
    expect(
      getValuePercent({
        value: 10,
      })
    ).toBe(10)
  })

  it('возвращает значение не больше 100', () => {
    expect(
      getValuePercent({
        value: 199,
        valueMax: 155,
      })
    ).toBe(100)
  })

  it('возвращает значение не меньше 0', () => {
    expect(
      getValuePercent({
        value: -1003,
        valueMin: 22,
      })
    ).toBe(0)
  })

  it('возвращает 0 при отсутствии значения', () => {
    expect(getValuePercent({})).toBe(0)
  })
})

describe('getMinChartSize', () => {
  it('получение минимального размера необрезанного графика без отображения значений', () => {
    expect(getMinChartSize()).toEqual(50)
  })

  it('получение минимального размера графика обрезанного по горизонтали c отображением значений', () => {
    expect(getMinChartSize('top', true)).toEqual(96)
    expect(getMinChartSize('bottom', true)).toEqual(96)
  })
  it('получение минимального размера графика обрезанного по вертикали c отображением значений', () => {
    expect(getMinChartSize('left', true)).toEqual(148)
    expect(getMinChartSize('right', true)).toEqual(148)
  })

  it('получение минимального размера необрезанного графика с отображением подписи', () => {
    expect(getMinChartSize(undefined, true, true)).toEqual(128)
  })

  it('получение минимального размера обрезанного графика с отображением подписи', () => {
    expect(getMinChartSize('bottom', true, true)).toEqual(170)
    expect(getMinChartSize('left', true, true)).toEqual(170)
  })
})
