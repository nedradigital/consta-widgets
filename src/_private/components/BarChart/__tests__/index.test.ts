import { Groups } from '../'
import {
  defaultGetAxisShowPositions,
  getColumnSize,
  getEveryNTick,
  getGraphStepSize,
  getGridSettings,
  getGroupsDomain,
  getRange,
  getScaler,
  getTotalByColumn,
  getValuesDomain,
  toAxisSize,
} from '../helpers'

describe('getEveryNTick', () => {
  it('получение каждой засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 1)).toEqual([0, 1, 2, 3, 4])
  })

  it('получение каждой второй засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 2)).toEqual([0, 2, 4])
  })

  it('получение каждой засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-3, -2, -1, 0, 1, 2, 3], 1)).toEqual([-3, -2, -1, 0, 1, 2, 3])
  })

  it('получение каждой второй засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 2)).toEqual([-4, -2, 0, 2, 4])
  })
})

describe('getGraphStepSize', () => {
  it('возвращает размер графика, как размер группы если массив размеров пуст', () => {
    expect(getGraphStepSize(450, [])).toEqual(450)
  })

  it('возвращает размер графика, как размер группы если массив размеров содержит 1 элемент', () => {
    expect(getGraphStepSize(450, [50])).toEqual(450)
  })

  it('возвращает значение размера шага второй группы, если их всего 2', () => {
    expect(getGraphStepSize(450, [250, 50])).toEqual(200)
  })

  it('возвращает значение размера шага группы', () => {
    expect(getGraphStepSize(450, [150, 50, 50, 150])).toEqual(75)
  })
})

describe('getRange', () => {
  it('возвращает диапазон', () => {
    expect(getRange(100)).toEqual([0, 100])
  })

  it('возвращает перевернутый диапазон', () => {
    expect(getRange(100, true)).toEqual([100, 0])
  })
})

describe('getTotalByColumn', () => {
  it('возвращает 0 если в колонке нет данных', () => {
    expect(getTotalByColumn(undefined)).toEqual(0)
  })

  it('возвращает сумму значений секций', () => {
    expect(getTotalByColumn({ total: 45 })).toEqual(45)
  })

  it('возвращает сумму значений секций с отрицаиельными значениями', () => {
    expect(getTotalByColumn({ total: -40 })).toEqual(40)
  })
})

describe('defaultGetGroupsDomain', () => {
  const groups: Groups = [
    {
      name: 'группа 1',
      columns: [],
      reversedColumns: [],
    },
    {
      name: 'группа 2',
      columns: [],
      reversedColumns: [],
    },
    {
      name: 'группа 3',
      columns: [],
      reversedColumns: [],
    },
  ]

  it('возвращает массив названий групп', () => {
    expect(getGroupsDomain(groups)).toEqual(['группа 1', 'группа 2', 'группа 3'])
  })
})

describe('getColumnSize', () => {
  it('возвращает размер бара, который зависит от размера текста', () => {
    expect(getColumnSize({ size: 'auto', valueLength: 1, isHorizontal: false })).toEqual('s')
    expect(getColumnSize({ size: 'auto', valueLength: 2, isHorizontal: false })).toEqual('m')
    expect(getColumnSize({ size: 'auto', valueLength: 3, isHorizontal: false })).toEqual('xl')
    expect(getColumnSize({ size: 'auto', valueLength: 4, isHorizontal: false })).toEqual('2xl')
    expect(getColumnSize({ size: 'auto', valueLength: 5, isHorizontal: false })).toEqual('3xl')
  })

  it('возвращает размер m для горизонтального графика', () => {
    expect(getColumnSize({ size: 'auto', valueLength: 5, isHorizontal: true })).toEqual('m')
  })

  it('возвращает заданный размер', () => {
    expect(getColumnSize({ size: 'm', valueLength: 5, isHorizontal: true })).toEqual('m')
    expect(getColumnSize({ size: 's', valueLength: 10, isHorizontal: false })).toEqual('s')
    expect(getColumnSize({ size: 'l', valueLength: 0, isHorizontal: true })).toEqual('l')
    expect(getColumnSize({ size: 'xl', valueLength: 15, isHorizontal: false })).toEqual('xl')
  })
})

describe('toAxisSize', () => {
  it('возвращает Axis размер', () => {
    expect(toAxisSize('l')).toEqual('m')
    expect(toAxisSize('xl')).toEqual('m')
    expect(toAxisSize('2xl')).toEqual('m')
  })

  it('возвращает заданный размер', () => {
    expect(toAxisSize('s')).toEqual('s')
    expect(toAxisSize('m')).toEqual('m')
  })
})

describe('defaultGetAxisShowPositions', () => {
  it('получение настроек расположения осей для вертикального графика без отрицательных значений', () => {
    const result = defaultGetAxisShowPositions({ isHorizontal: false, showReversed: false })

    expect(result).toEqual({
      top: false,
      right: false,
      bottom: true,
      left: true,
    })
  })

  it('получения настроек расположения осей для горизонтального графика без отрицательных значений', () => {
    const result = defaultGetAxisShowPositions({ isHorizontal: true, showReversed: false })

    expect(result).toEqual({
      top: false,
      right: false,
      bottom: true,
      left: true,
    })
  })

  it('получение настроек расположения осей для вертикального графика с отрицательными значениями', () => {
    const result = defaultGetAxisShowPositions({ isHorizontal: false, showReversed: true })

    expect(result).toEqual({
      top: true,
      right: false,
      bottom: true,
      left: true,
    })
  })

  it('получение настроек расположения осей для горизонтального графика с отрицательными значениями', () => {
    const result = defaultGetAxisShowPositions({ isHorizontal: true, showReversed: true })

    expect(result).toEqual({
      top: false,
      right: true,
      bottom: true,
      left: true,
    })
  })
})

describe('defaultGetValuesDomain', () => {
  const groups: Groups = [
    {
      name: '1',
      columns: [{ total: 50 }, { total: 45 }],
      reversedColumns: [{ total: 100 }],
    },
  ]

  it('возвращает значение для домена', () => {
    const result = getValuesDomain(groups, false)

    expect(result).toEqual([0, 100])
  })

  it('возвращает значения для домена с перевернутыми колонками', () => {
    const result = getValuesDomain(groups, true)

    expect(result).toEqual([-100, 100])
  })
})

describe('getScaler', () => {
  it('возвращает отскалированное значение', () => {
    const scaler = getScaler({ maxValue: 100, showReversed: false })

    expect(scaler(200, 50)).toEqual(100)
    expect(scaler(200, 200)).toEqual(200)
  })

  it('возвращает отскалированное значение при наличии отрицательных данных', () => {
    const scaler = getScaler({ maxValue: 100, showReversed: true })

    expect(scaler(200, 50)).toEqual(50)
  })
})

describe('getGridSettings', () => {
  describe('горизонтальный график', () => {
    it('возвращает настройки для грида', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        showReversed: false,
        showUnitBottom: false,
        showUnitLeft: false,
      })

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas:
          '"labelLeft0 group0" ' +
          '"labelLeft1 group1" ' +
          '"labelLeft2 group2" ' +
          '"bottomLeft bottomTicks" ',
      })
    })

    it('возвращает настройки для грида с отрицательными значениями', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        showReversed: true,
        showUnitBottom: false,
        showUnitLeft: false,
      })

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateAreas:
          '"labelLeft0 group0 labelRight0" ' +
          '"labelLeft1 group1 labelRight1" ' +
          '"labelLeft2 group2 labelRight2" ' +
          '"bottomLeft bottomTicks bottomRight" ',
      })
    })

    it('возвращает настройки для грида с юнитами', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        showReversed: false,
        showUnitBottom: true,
        showUnitLeft: true,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr 1fr 1fr auto auto',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas:
          '"topLeft topLeft" ' +
          '"labelLeft0 group0" ' +
          '"labelLeft1 group1" ' +
          '"labelLeft2 group2" ' +
          '"bottomLeft bottomTicks" ' +
          '"bottomLeft bottomUnit"',
      })
    })

    it('возвращает настройки для грида с отрицательными значениями и юнитами', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        showReversed: true,
        showUnitBottom: true,
        showUnitLeft: true,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr 1fr 1fr auto auto',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateAreas:
          '"topLeft topLeft topLeft" ' +
          '"labelLeft0 group0 labelRight0" ' +
          '"labelLeft1 group1 labelRight1" ' +
          '"labelLeft2 group2 labelRight2" ' +
          '"bottomLeft bottomTicks bottomRight" ' +
          '"bottomLeft bottomUnit bottomUnit"',
      })
    })
  })

  describe('вертикальный график', () => {
    it('возвращает настройки для грида', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
        showReversed: false,
        showUnitBottom: false,
        showUnitLeft: false,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ',
      })
    })

    it('возвращает настройки для грида с отрицательными значениями', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
        showReversed: true,
        showUnitBottom: false,
        showUnitLeft: false,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ',
      })
    })

    it('возвращает настройки для грида с юнитами', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
        showReversed: false,
        showUnitBottom: true,
        showUnitLeft: true,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr auto auto',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ' +
          '"bottomLeft bottomUnit bottomUnit bottomUnit"',
      })
    })

    it('возвращает настройки для грида с отрицательными значениями и юнитами', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
        showReversed: false,
        showUnitBottom: true,
        showUnitLeft: true,
      })

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr auto auto',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ' +
          '"bottomLeft bottomUnit bottomUnit bottomUnit"',
      })
    })
  })
})
