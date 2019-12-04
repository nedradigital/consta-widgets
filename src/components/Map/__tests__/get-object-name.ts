import { getObjectName } from '../'

export const EMPTY_GEO_DATA = { type: 'Polygon', geometry: null, properties: null } as const

describe('getObjectName', () => {
  it('возвращает имя страны из словаря', () => {
    expect(
      getObjectName({
        type: 'country',
        id: 'RU',
        geoData: EMPTY_GEO_DATA,
      })
    ).toEqual('Россия')

    expect(
      getObjectName({
        type: 'country',
        id: 'RS',
        geoData: EMPTY_GEO_DATA,
      })
    ).toEqual('Сербия')
  })

  it('возвращает имя региона из словаря', () => {
    expect(
      getObjectName({
        type: 'region',
        id: 'RU-KHM',
        geoData: EMPTY_GEO_DATA,
      })
    ).toEqual('Ханты-Мансийский АО')

    expect(
      getObjectName({
        type: 'region',
        id: 'RU-YAN',
        geoData: EMPTY_GEO_DATA,
      })
    ).toEqual('Ямало-Ненецкий АО')
  })

  it('возвращает имя из геоданных', () => {
    expect(
      getObjectName({
        type: 'country',
        id: 'UNKNOWN_ID',
        geoData: {
          ...EMPTY_GEO_DATA,
          properties: {
            name: 'Кастомное имя',
          },
        },
      })
    ).toEqual('Кастомное имя')
  })

  it('если имя есть и в словаре, и в геоданных, то отдаёт предпочтение имени из словаря', () => {
    expect(
      getObjectName({
        type: 'country',
        id: 'RU',
        geoData: {
          ...EMPTY_GEO_DATA,
          properties: {
            name: 'Кастомное имя',
          },
        },
      })
    ).toEqual('Россия')
  })

  it('возвращает undefined, если имя не нашлось', () => {
    expect(getObjectName(undefined)).toEqual(undefined)
    expect(
      getObjectName({
        type: 'country',
        id: 'UNKNOWN-ID',
        geoData: EMPTY_GEO_DATA,
      })
    ).toEqual(undefined)
  })
})
