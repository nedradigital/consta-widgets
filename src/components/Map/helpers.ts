import { ExtendedFeature } from 'd3'
import { MultiPoint } from 'geojson'

import {
  Coords,
  ExtendedFeatureOrCollection,
  GeoObject,
  GeoObjectLocation,
  GeoPoint,
  MapPadding,
  SelectedObjectId,
} from './'

type Projection = (mutablePoint: [number, number]) => readonly [number, number] | null

export const featureToObject = (type: 'country' | 'region') => (
  feature: ExtendedFeature
): GeoObject => ({
  type,
  id: String(feature.id),
  geoData: feature,
})

export const geoCoordsToPixels = (
  projection: Projection,
  geoCoords: Coords
): { x: number; y: number } | undefined => {
  const pixelCoords = projection([geoCoords[0], geoCoords[1]])
  return pixelCoords ? { x: pixelCoords[0], y: pixelCoords[1] } : undefined
}

const GEOPOINT_ZOOM_DELTA = 30
/**
 * Объединяем группу точек в одну сущность, чтобы производить с ней гео-манипуляции
 * (центрирование или поиск координат центра)
 */
export const geoPointsToExtendedFeature = (
  points: readonly GeoPoint[],
  forceMultiPoint?: boolean
): ExtendedFeature<MultiPoint> => {
  // Если точка одна, то возвращаем область радиусом GEOPOINT_ZOOM_DELTA вокруг неё
  if (forceMultiPoint && points.length === 1) {
    const { coords } = points[0]
    return {
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [coords[0] - GEOPOINT_ZOOM_DELTA, coords[1] - GEOPOINT_ZOOM_DELTA],
          [coords[0] + GEOPOINT_ZOOM_DELTA, coords[1] + GEOPOINT_ZOOM_DELTA],
        ],
      },
      properties: {},
    }
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: points.map(point => [...point.coords]),
    },
    properties: {},
  }
}

export const getVisibleObjects = (
  objects: readonly GeoObject[],
  selectedObjectId: SelectedObjectId
) => {
  const selectedObject = objects.find(o => o.id === selectedObjectId)

  return objects.filter(o => {
    if (!selectedObject) {
      return ['country', 'region'].includes(o.type)
    }

    switch (selectedObject.type) {
      case 'country':
        return (
          ['country', 'region'].includes(o.type) ||
          // Области выбранной страны
          (o.type === 'location' && o.parentId === selectedObject.id)
        )
      case 'region':
        return (
          o.type === 'region' ||
          // Области выбранного региона
          (o.type === 'location' && o.parentId === selectedObject.id)
        )
      case 'location':
        return (
          o.id === selectedObject.parentId ||
          // Области в том же регионе, что и выбранная
          (o.type === 'location' && o.parentId === selectedObject.parentId)
        )
    }
  })
}

export const SINGLE_LOCATION_ZOOM_PADDING = 1 / 3

export const getFeatureToZoomOn = ({
  selectedObject,
  points,
  visibleObjects,
  defaultPadding,
  width,
  height,
}: {
  selectedObject: GeoObject | undefined
  points: readonly GeoPoint[]
  visibleObjects: readonly GeoObject[]
  defaultPadding: MapPadding
  width: number
  height: number
}): { feature: ExtendedFeatureOrCollection; padding: MapPadding } => {
  if (!selectedObject) {
    return { feature: geoPointsToExtendedFeature(points, true), padding: defaultPadding }
  }

  if (['region', 'country'].includes(selectedObject.type)) {
    const includedLocations = visibleObjects.filter(
      (obj): obj is GeoObjectLocation => obj.type === 'location'
    )

    const padding =
      includedLocations.length > 1
        ? defaultPadding
        : ([height * SINGLE_LOCATION_ZOOM_PADDING, width * SINGLE_LOCATION_ZOOM_PADDING] as const)

    return {
      feature: {
        type: 'FeatureCollection',
        features: includedLocations.map(loc => loc.geoData),
      },
      padding,
    }
  }

  return { feature: selectedObject.geoData, padding: defaultPadding }
}
