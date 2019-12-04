import { ExtendedFeature, ExtendedFeatureCollection } from 'd3'
import { Polygon } from 'geojson'

import { GeoObject, GeoObjectLocation } from '../'

const locationsData = [
  ['RU-YAN', require('./ЯНАО.geojson')],
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
