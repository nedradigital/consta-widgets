import { minimalData, minimalDataFilters } from '../data.mock'
import {
  filterRoadmapData,
  getAlignForColumns,
  getColumnCount,
  getGridTemplateColumns,
  getLineStyle,
  getLongestTextFromColumns,
  getMonths,
  getXCoordByDate,
  MARGIN_BETWEEN_BARS,
} from '../helpers'

describe('filterRoadmapData', () => {
  it('возвращает исходные данные, если не выбраны фильтры', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: minimalDataFilters,
      selectedFilters: {},
    })

    expect(data).toEqual(minimalData.rows)
  })

  it('не возвращает ничего при фильтрах за пределами данных', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: [
        {
          id: 'roadmap',
          field: 'installationPlaces',
          filterer: (value: string) => value === 'Roadmap best widget ever!',
          name: 'Roadmap лучший виджет',
        },
      ],
      selectedFilters: {
        installationPlaces: ['roadmap'],
      },
    })

    expect(data).toEqual([])
  })

  it('фильтрует по одной строке', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: minimalDataFilters,
      selectedFilters: {
        installationPlaces: ['yamburghNGKM'],
      },
    })

    expect(data).toEqual([minimalData.rows[0]])
  })

  it('фильтрует внутри столбцов по ИЛИ', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: minimalDataFilters,
      selectedFilters: {
        complex: ['mupn1500', 'zhq-342-23'],
      },
    })

    expect(data).toEqual(minimalData.rows)
  })

  it('фильтрует по двум строкам', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: minimalDataFilters,
      selectedFilters: {
        installationPlaces: ['yamburghNGKM'],
        complex: ['mupn1500'],
      },
    })

    expect(data).toEqual([minimalData.rows[0]])
  })

  it('не возвращает ничего если среди фильтров отсутствует выбранный', () => {
    const data = filterRoadmapData({
      rows: minimalData.rows,
      filters: minimalDataFilters,
      selectedFilters: {
        installationPlaces: ['UNDEFINED'],
      },
    })

    expect(data).toEqual([])
  })

  it('не отсеивает React компоненты, если не выбраны фильтры', () => {
    const data = filterRoadmapData({
      rows: [
        {
          id: 'row1',
          columns: {
            installationPlaces: '1. Ямбургское НГКМ',
          },
          groups: [],
        },
        {
          id: 'row2',
          columns: {
            // React компонент
            installationPlaces: {},
          },
          groups: [],
        },
      ],
      filters: minimalDataFilters,
      selectedFilters: {},
    })

    expect(data).toEqual([
      {
        id: 'row1',
        columns: {
          installationPlaces: '1. Ямбургское НГКМ',
        },
        groups: [],
      },
      {
        id: 'row2',
        columns: {
          // React компонент
          installationPlaces: {},
        },
        groups: [],
      },
    ])
  })

  it('отсеивает React компоненты при фильтрации', () => {
    const data = filterRoadmapData({
      rows: [
        {
          id: 'row1',
          columns: {
            installationPlaces: '1. Ямбургское НГКМ',
          },
          groups: [],
        },
        {
          id: 'row2',
          columns: {
            // React компонент
            installationPlaces: {},
          },
          groups: [],
        },
      ],
      filters: minimalDataFilters,
      selectedFilters: {
        installationPlaces: ['yamburghNGKM'],
      },
    })

    expect(data).toEqual([
      {
        id: 'row1',
        columns: {
          installationPlaces: '1. Ямбургское НГКМ',
        },
        groups: [],
      },
    ])
  })
})

describe('getAlignForColumns', () => {
  it('получение настроек выравнивания текста для колонок', () => {
    expect(
      getAlignForColumns([
        {
          title: 'МЕСТА УСТАНОВКИ',
          accessor: 'installationPlaces',
        },
        {
          title: 'КОМПЛЕКС',
          accessor: 'complex',
          align: 'center',
        },
      ])
    ).toEqual({
      installationPlaces: 'left',
      complex: 'center',
    })
  })
})

describe('getColumnCount', () => {
  it('получения максимального количества колонок для пустых данных', () => {
    const count = getColumnCount([])

    expect(count).toEqual(0)
  })

  it('получение максимального количества колонок для одной строки', () => {
    const count = getColumnCount([
      {
        columns: {
          installationPlaces: '1. Ямбургское НГКМ',
          complex: 'МУПН 1500',
        },
      },
    ])

    expect(count).toEqual(2)
  })

  it('получение максимального количества колонок для двух строк', () => {
    const count = getColumnCount([
      {
        columns: {
          installationPlaces: '1. Ямбургское НГКМ',
          complex: 'МУПН 1500',
        },
      },
      {
        columns: {
          installationPlaces: '2. Место установки 2',
          complex: 'ZHQ-342-23',
        },
      },
    ])

    expect(count).toEqual(2)
  })

  it('получение максимального количества колонок для двух строк, если в одной строке колонок меньше чем в другой', () => {
    const count = getColumnCount([
      {
        columns: {
          installationPlaces: '1. Ямбургское НГКМ',
        },
      },
      {
        columns: {
          installationPlaces: '2. Место установки 2',
          complex: 'ZHQ-342-23',
        },
      },
    ])

    expect(count).toEqual(2)
  })
})

describe('getGridTemplateColumns', () => {
  it('получение значения шаблона колонок для CSS Grid', () => {
    expect(getGridTemplateColumns(50, 2)).toEqual('100px auto')
  })
})

describe('getLongestTextFromColumns', () => {
  it('получение самой длинной строки для пустых колонок', () => {
    const result = getLongestTextFromColumns({})

    expect(result).toEqual('')
  })

  it('получение самой длинной строки из всех колонок', () => {
    const result = getLongestTextFromColumns({
      installationPlaces: '1. Ямбургское НГКМ',
      complex: 'МУПН 1500',
    })

    expect(result).toEqual('1. Ямбургское НГКМ')
  })

  it('получение самой длинной строки из всех колонок, игнорируя React компоненты', () => {
    const result = getLongestTextFromColumns({
      installationPlaces: '1. Ямбургское НГКМ',
      complex: {},
    })

    expect(result).toEqual('1. Ямбургское НГКМ')
  })
})

describe('getMonths', () => {
  it('получение списка месяцев для одного года', () => {
    const months = getMonths(Date.UTC(2019, 0, 1), Date.UTC(2019, 1, 1))

    expect(months).toEqual([
      {
        value: 'янв',
        year: 2019,
        period: 'I',
      },
      {
        value: 'фев',
        year: 2019,
        period: undefined,
      },
    ])
  })

  it('получение списка месяцев для нескольких лет', () => {
    const months = getMonths(Date.UTC(2019, 11, 1), Date.UTC(2020, 0, 1))

    expect(months).toEqual([
      {
        value: 'дек',
        year: 2019,
        period: 'IV',
      },
      {
        value: 'янв',
        year: 2020,
        period: 'I',
      },
    ])
  })
})

describe('getStyle', () => {
  const monthWidth = 100

  it('получение стилей линии, без отступов', () => {
    const style = getLineStyle({
      graphStartDate: Date.UTC(2019, 0, 1),
      startDate: Date.UTC(2019, 0, 1),
      endDate: Date.UTC(2019, 1, 1),
      monthWidth,
      withMargin: false,
    })

    expect(style).toEqual({
      left: 0,
      width: monthWidth,
    })
  })

  it('получение стилей линии, с отступами', () => {
    const style = getLineStyle({
      graphStartDate: Date.UTC(2019, 0, 1),
      startDate: Date.UTC(2019, 0, 1),
      endDate: Date.UTC(2019, 1, 1),
      monthWidth,
      withMargin: true,
    })

    expect(style).toEqual({
      left: MARGIN_BETWEEN_BARS,
      width: monthWidth - MARGIN_BETWEEN_BARS,
    })
  })
})

describe('getXCoordByDate', () => {
  it('получение нулевой позиции если начальные даты совпадают', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 0, 1),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(0)
  })

  it('получение позиции X равной размеру месяца, если даты отличаются в один месяц', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 1, 1),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(100)
  })

  it('получение позиции X, если разница в датах меньше чем месяц', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 0, 15),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(45)
  })
})
