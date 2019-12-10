import { isDefined } from '@gaz/utils/lib/type-guards'
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3'
import * as d3 from 'd3'
import { Point, Polygon } from 'geojson'

import { ConnectionPoint, GeoObject, GeoObjectLocation, GeoPoint } from '../'

const locationsData: ReadonlyArray<readonly [string, ExtendedFeatureCollection]> = [
  ['RU-YAN', require('./ЯНАО.geojson')],
  ['RU-KHM', require('./ХМАО.geojson')],
  ['RU-TOM', require('./Томск.geojson')],
  ['RU-IRK', require('./Иркутск.geojson')],
  ['RS', require('./Сербия.geojson')],
] as const

const transformFeature = (
  id: string,
  feature: ExtendedFeature<Polygon>
): ExtendedFeature<Polygon> => {
  return {
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: feature.geometry.coordinates.map(c => [...c].reverse()),
    },
    properties: {
      name: (feature.properties && feature.properties.description) || id,
    },
  }
}

const isPolygon = (feature: ExtendedFeature): feature is ExtendedFeature<Polygon> => {
  return Boolean(feature.geometry && feature.geometry.type === 'Polygon')
}

const isPoint = (feature: ExtendedFeature): feature is ExtendedFeature<Point> => {
  return Boolean(feature.geometry && feature.geometry.type === 'Point')
}

const yaMapsToGeoObject = (
  parentId: string,
  yaMapsObject: ExtendedFeatureCollection
): readonly GeoObject[] => {
  return yaMapsObject.features.filter(isPolygon).map((feature, idx) => {
    const id = `${parentId}-${idx}`

    return {
      type: 'location',
      id,
      parentId,
      geoData: transformFeature(id, feature),
    }
  })
}

export const EXAMPLE_LOCATIONS: readonly GeoObjectLocation[] = locationsData
  .map(([id, data]) => yaMapsToGeoObject(id, data))
  .flat()

export const EXAMPLE_CONNECTION_POINTS: readonly ConnectionPoint[] = [
  {
    id: 'Спб',
    coords: [30.311515, 59.942568],
    name: 'ЦУБ Санкт-Петербург',
  },
  {
    id: 'Тюмень',
    coords: [65.534328, 57.153033],
    name: 'ЦУБ Тюмень',
  },
]

const getConnectionPointId = (point: ExtendedFeature<Point>): string | undefined => {
  if (!point.properties) {
    return
  }

  const found = point.properties.description.match(/^ЦУБ=(?<id>.*)$/)
  return found ? found.groups.id : undefined
}

const yaMapsToGeoPoint = (
  yaMapsObject: ExtendedFeatureCollection,
  locations: readonly GeoObjectLocation[]
): readonly GeoPoint[] => {
  return yaMapsObject.features
    .filter(isPoint)
    .map((point, idx): GeoPoint | undefined => {
      const { coordinates } = point.geometry
      const parentLocation = locations.find(location =>
        d3.geoContains(location.geoData, [coordinates[0], coordinates[1]])
      )

      return parentLocation
        ? {
            id: `${parentLocation.id}-${idx}`,
            name: point.properties ? point.properties.iconCaption : undefined,
            parentId: parentLocation.id,
            connectionPointId: getConnectionPointId(point),
            coords: [coordinates[0], coordinates[1]] as const,
          }
        : undefined
    })
    .filter(isDefined)
}

export const EXAMPLE_POINTS: readonly GeoPoint[] = locationsData
  .map(([id, data]) =>
    yaMapsToGeoPoint(data, EXAMPLE_LOCATIONS.filter(location => location.parentId === id))
  )
  .flat()
