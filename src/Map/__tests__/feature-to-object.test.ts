import { ExtendedFeature } from 'd3'

import { featureToObject } from '../helpers'

const FEATURE: ExtendedFeature = {
  type: 'Feature',
  id: 1,
  geometry: {
    coordinates: [0, 0],
    type: 'Point',
  },
  properties: {},
}

describe('featureToObject', () => {
  it('преобразование GeoJSON Feature к географическому объекту', () => {
    expect(featureToObject('country')(FEATURE)).toEqual({
      type: 'country',
      id: '1',
      geoData: FEATURE,
    })

    expect(featureToObject('region')(FEATURE)).toEqual({
      type: 'region',
      id: '1',
      geoData: FEATURE,
    })
  })
})
