import { GeoObject, getVisibleObjects } from '../'

const EMPTY_GEO_DATA = { type: 'Polygon', geometry: null, properties: null } as const

const countryA: GeoObject = {
  type: 'country',
  id: 'Country A',
  geoData: EMPTY_GEO_DATA,
}

const countryB: GeoObject = {
  type: 'country',
  id: 'Country B',
  geoData: EMPTY_GEO_DATA,
}

const regionC: GeoObject = {
  type: 'region',
  id: 'Region C',
  geoData: EMPTY_GEO_DATA,
}

const regionD: GeoObject = {
  type: 'region',
  id: 'Region D',
  geoData: EMPTY_GEO_DATA,
}

const locationA1: GeoObject = {
  type: 'location',
  id: 'Location A1',
  parentId: countryA.id,
  geoData: EMPTY_GEO_DATA,
  name: 'A1',
}

const locationC1: GeoObject = {
  type: 'location',
  id: 'Location C1',
  parentId: regionC.id,
  geoData: EMPTY_GEO_DATA,
  name: 'C1',
}

const locationC2: GeoObject = {
  type: 'location',
  id: 'Location C2',
  parentId: regionC.id,
  geoData: EMPTY_GEO_DATA,
  name: 'C2',
}

const locationD1: GeoObject = {
  type: 'location',
  id: 'Location D1',
  parentId: regionD.id,
  geoData: EMPTY_GEO_DATA,
  name: 'D1',
}

const allObjects = [
  countryA,
  countryB,
  regionC,
  regionD,
  locationA1,
  locationC1,
  locationC2,
  locationD1,
] as const

describe('getVisibleObjects', () => {
  it('если ничего не выбрано, возвращает все страны и все регионы', () => {
    expect(getVisibleObjects(allObjects, undefined)).toEqual([countryA, countryB, regionC, regionD])
  })

  it('если выбрана страна, возвращает все страны, все регионы и локации внутри выбранной страны', () => {
    expect(getVisibleObjects(allObjects, countryA.id)).toEqual([
      countryA,
      countryB,
      regionC,
      regionD,
      locationA1,
    ])
  })

  it('если выбран регион, возвращает все регионы и локации в выбранном регионе', () => {
    expect(getVisibleObjects(allObjects, regionC.id)).toEqual([
      regionC,
      regionD,
      locationC1,
      locationC2,
    ])
  })

  it('если выбрана локация, возвращает регион, в котором она расположена, и все локации в том же регионе', () => {
    expect(getVisibleObjects(allObjects, locationC1.id)).toEqual([regionC, locationC1, locationC2])
  })
})
