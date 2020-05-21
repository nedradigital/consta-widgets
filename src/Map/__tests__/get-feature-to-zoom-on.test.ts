import { GeoObject, GeoPoint } from '../'
import { getFeatureToZoomOn, SINGLE_LOCATION_ZOOM_PADDING } from '../helpers'

describe('getFeatureToZoomOn', () => {
  const REGION: GeoObject = {
    type: 'region',
    id: 'r1',
    geoData: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0]]],
      },
      properties: {},
    },
  }
  const LOCATION1: GeoObject = {
    type: 'location',
    id: 'l1',
    name: 'l1',
    parentId: REGION.id,
    geoData: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[1, 1]]],
      },
      properties: {},
    },
  }
  const LOCATION2: GeoObject = {
    type: 'location',
    id: 'l2',
    name: 'l2',
    parentId: REGION.id,
    geoData: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[2, 2]]],
      },
      properties: {},
    },
  }
  const POINT1: GeoPoint = {
    id: 'p1',
    name: 'p1',
    parentId: undefined,
    coords: [10, 10],
  }
  const POINT2: GeoPoint = {
    id: 'p2',
    name: 'p2',
    parentId: undefined,
    coords: [20, 20],
  }
  const defaultPadding = [10, 10] as const
  const width = 900
  const height = 300
  const commonParams = {
    points: [],
    defaultPadding,
    width,
    height,
  }

  it('если выбрана локация, зумим на неё', () => {
    expect(
      getFeatureToZoomOn({
        ...commonParams,
        selectedObject: LOCATION1,
        visibleObjects: [LOCATION1],
      })
    ).toEqual({
      feature: LOCATION1.geoData,
      padding: defaultPadding,
    })
  })

  it('если выбран регион, зумим на его локации', () => {
    expect(
      getFeatureToZoomOn({
        ...commonParams,
        selectedObject: REGION,
        visibleObjects: [REGION, LOCATION1, LOCATION2],
      })
    ).toEqual({
      feature: {
        type: 'FeatureCollection',
        features: [LOCATION1.geoData, LOCATION2.geoData],
      },
      padding: defaultPadding,
    })
  })

  it('если выбран регион с 1 локацией, зумим на эту локацию, но с большими отступами', () => {
    expect(
      getFeatureToZoomOn({
        ...commonParams,
        selectedObject: REGION,
        visibleObjects: [REGION, LOCATION1],
      })
    ).toEqual({
      feature: {
        type: 'FeatureCollection',
        features: [LOCATION1.geoData],
      },
      padding: [height * SINGLE_LOCATION_ZOOM_PADDING, width * SINGLE_LOCATION_ZOOM_PADDING],
    })
  })

  it('если не выбрано ничего и видно несколько точек, зумим на область с этими точками', () => {
    expect(
      getFeatureToZoomOn({
        ...commonParams,
        selectedObject: undefined,
        visibleObjects: [REGION],
        points: [POINT1, POINT2],
      })
    ).toEqual({
      feature: {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: [POINT1.coords, POINT2.coords],
        },
        properties: {},
      },
      padding: defaultPadding,
    })
  })

  it('если не выбрано ничего и видна только 1 точка, зумим на область вокруг этой точки', () => {
    expect(
      getFeatureToZoomOn({
        ...commonParams,
        selectedObject: undefined,
        visibleObjects: [REGION],
        points: [POINT1],
      })
    ).toEqual({
      feature: {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: [
            [-20, -20],
            [40, 40],
          ],
        },
        properties: {},
      },
      padding: defaultPadding,
    })
  })
})
