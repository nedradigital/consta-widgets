import { getColumnLeftOffset, getColumnsSize } from '../helpers'

describe('getColumnsSize', () => {
  it('получение размера колонок', () => {
    const result = getColumnsSize([150, undefined])

    expect(result).toEqual('150px minmax(min-content, 1fr)')
  })
})

describe('getColumnLeftOffset', () => {
  it('получение отступа слева от колонки, если размеры колонок отсутствуют', () => {
    const result = getColumnLeftOffset({
      columnIndex: 0,
      resizedColumnWidths: [],
      initialColumnWidths: [],
    })

    expect(result).toEqual(0)
  })

  it('получение отступа слева от колонки, если у колонки не изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 1,
      resizedColumnWidths: [],
      initialColumnWidths: [100],
    })

    expect(result).toEqual(100)
  })

  it('получение отступа слева от колонки, если у колонки изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 1,
      resizedColumnWidths: [200],
      initialColumnWidths: [100],
    })

    expect(result).toEqual(200)
  })

  it('получение отступа слева от колонки, если не у всех колонок до выбранной изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 3,
      resizedColumnWidths: [200, undefined, 300],
      initialColumnWidths: [100, 100, 100],
    })

    expect(result).toEqual(600)
  })
})
