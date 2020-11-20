import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'

import russiaHigh from '@amcharts/amcharts4-geodata/russiaCrimeaHigh'
import russiaLow from '@amcharts/amcharts4-geodata/russiaCrimeaLow'
import worldHigh from '@amcharts/amcharts4-geodata/worldHigh'
import worldLow from '@amcharts/amcharts4-geodata/worldLow'
import worldUltra from '@amcharts/amcharts4-geodata/worldUltra'
import { useComponentSize } from '@consta/uikit/useComponentSize'
import * as d3 from 'd3'
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3'

import { MapObjects } from './components/MapObjects'
import { MapPoints } from './components/MapPoints'
import { featureToObject, getFeatureToZoomOn, getVisibleObjects } from './helpers'
import css from './index.css'
import { useZoom } from './use-zoom'

export * from './geo-names'

export type ExtendedFeatureOrCollection = ExtendedFeature | ExtendedFeatureCollection

export type GeoObjectLocation = {
  id: string
  type: 'location'
  geoData: ExtendedFeature
  parentId: string
  name: string
}

export type GeoObject =
  | {
      id: string
      type: 'country' | 'region'
      geoData: ExtendedFeatureOrCollection
    }
  | GeoObjectLocation

export type Coords = readonly [number, number]

export type GeoPoint = {
  id: string
  parentId: string | undefined
  connectionPointId?: string
  coords: Coords
  name: string
}

export type ConnectionPoint = {
  id: string
  coords: Coords
  name: string
}

export type ConnectionLine = {
  fromObjectId: string
  toObjectId: string
  d: string | null
  lineLength: number
  preventAnimation: boolean
}

export type RenderPoint = (point: GeoPoint) => React.ReactNode
export type RenderObjectPoint = (
  location: GeoObject,
  info: {
    pointsInsideObject: readonly GeoPoint[]
  },
  mouseHandlers: {
    onClick: (e: React.MouseEvent) => void
    onMouseEnter: (e: React.MouseEvent) => void
    onMouseLeave: (e: React.MouseEvent) => void
  }
) => React.ReactElement | null
export type RenderConnectionPoint = (connectionPoint: ConnectionPoint) => React.ReactElement | null
export type RenderConnectionLine = (connectionLine: ConnectionLine) => React.ReactElement | null
export type RenderZoomOutButton = (o: { onClick: () => void }) => React.ReactElement | null
export type SelectedObjectId = string | undefined

export type MapPadding = readonly [number, number]

export type Data = {
  points: readonly GeoPoint[]
  locations?: readonly GeoObjectLocation[]
  connectionPoints?: readonly ConnectionPoint[]
  /** Отступы от краёв карты до объекта центрирования: [вертикальный, горизонтальный] */
  padding: MapPadding
  /** id выбранной страны, региона или локации */
  selectedObjectId: SelectedObjectId
  allowClickOnSelectedObject?: boolean
  onSelectedObjectIdChange: (selectedObjectId: SelectedObjectId) => void
  renderPoint: RenderPoint
  renderObjectPoint?: RenderObjectPoint
  renderConnectionPoint?: RenderConnectionPoint
  renderConnectionLine?: RenderConnectionLine
  renderZoomOutButton?: RenderZoomOutButton
}

type Props = Data

const ZOOM_HIGH_THRESHOLD = 3000

const getMaps = (
  isZooming: boolean,
  scale?: number
): readonly [ExtendedFeatureCollection, ExtendedFeatureCollection] => {
  if (isZooming) {
    return [worldLow, russiaLow]
  }

  if (scale && scale > ZOOM_HIGH_THRESHOLD) {
    return [worldUltra, russiaHigh]
  }

  return [worldHigh, russiaLow]
}

const getProjection = (width: number, height: number): d3.GeoProjection => {
  return d3
    .geoMercator()
    .clipExtent([
      [0, 0],
      [width, height],
    ])
    .rotate([-60, 0])
}

export const Map: React.FC<Props> = ({
  locations = [],
  points,
  connectionPoints = [],
  padding,
  selectedObjectId,
  allowClickOnSelectedObject,
  onSelectedObjectIdChange,
  renderPoint,
  renderObjectPoint = () => null,
  renderConnectionPoint = () => null,
  renderConnectionLine = () => null,
  renderZoomOutButton,
}) => {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [hoveredObjectId, setHoveredObjectId] = useState<string>()
  const setSelectedObjectId = (newId: SelectedObjectId) => onSelectedObjectIdChange(newId)
  const { zoom, isZooming, setProjection } = useZoom()

  const [world, russia] = getMaps(isZooming, zoom && zoom.scale)
  const worldWithoutRussia = useMemo(
    () => ({
      ...world,
      features: world.features.filter(f => f.id !== 'RU'),
    }),
    [world]
  )

  const isSelected = (object: GeoObject): boolean => object.id === selectedObjectId
  const isSelectable = (object: GeoObject): boolean =>
    (allowClickOnSelectedObject || !isSelected(object)) &&
    (object.type === 'location' || locations.some(loc => loc.parentId === object.id))

  const projection = useMemo(() => {
    const p = getProjection(width, height)

    if (zoom) {
      p.scale(zoom.scale).translate([zoom.translateX, zoom.translateY])
    }

    return p
  }, [zoom, width, height])

  const geoPath = useMemo(() => d3.geoPath(projection), [projection])

  const allObjects = useMemo(() => {
    return [
      ...worldWithoutRussia.features.map(featureToObject('country')),
      {
        type: 'country',
        id: 'RU',
        geoData: russia,
      },
      ...russia.features.map(featureToObject('region')),
      ...locations,
    ] as const
  }, [worldWithoutRussia, russia, locations])

  const visibleObjects = useMemo(() => getVisibleObjects(allObjects, selectedObjectId), [
    allObjects,
    selectedObjectId,
  ])

  const objectsWithCircles = selectedObjectId
    ? locations.filter(loc => loc.parentId === selectedObjectId)
    : visibleObjects.filter(isSelectable)

  const handleObjectSelect = (object: GeoObject) => {
    if (isSelected(object)) {
      allowClickOnSelectedObject && setSelectedObjectId(object.id)
    } else {
      setSelectedObjectId(isSelectable(object) ? object.id : undefined)
    }
  }

  const handleObjectHover = (object?: GeoObject) =>
    setHoveredObjectId(object ? object.id : undefined)

  const handleZoomOut = () => {
    const selectedObject = allObjects.find(isSelected)
    setSelectedObjectId(
      selectedObject && (selectedObject.type === 'location' ? selectedObject.parentId : undefined)
    )
  }

  // Анимация зума
  useLayoutEffect(() => {
    if (!width || !height) {
      return
    }

    const { feature: featureToZoomOn, padding: zoomPadding } = getFeatureToZoomOn({
      selectedObject: allObjects.find(isSelected),
      points,
      visibleObjects,
      defaultPadding: padding,
      width,
      height,
    })
    const [paddingY, paddingX] = zoomPadding
    const newProjection = getProjection(width, height).fitExtent(
      [
        [paddingX, paddingY],
        [width - paddingX, height - paddingY],
      ],
      featureToZoomOn as ExtendedFeature
    )

    setProjection(newProjection)

    // Тут нельзя делать зависимость от объектов, т.к. их изменения зацикливают событие зума
    // (во время зума снижается детализация мира и из-за этого обновляется геометрия объектов)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObjectId, width, height, points, padding])

  return (
    <div ref={ref} className={css.main}>
      {width && height && (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className={css.svg}
          onClick={e => {
            if (e.target === svgRef.current) {
              setSelectedObjectId(undefined)
            }
          }}
        >
          <MapObjects
            objects={visibleObjects}
            geoPath={geoPath}
            isObjectHovered={object => object.id === hoveredObjectId}
            isObjectSelected={isSelected}
            isObjectSelectable={isSelectable}
            onObjectSelect={handleObjectSelect}
            onObjectHover={handleObjectHover}
          />

          <MapPoints
            objects={objectsWithCircles}
            locations={locations}
            points={points}
            connectionPoints={connectionPoints}
            selectedObjectId={selectedObjectId}
            isZooming={isZooming}
            projection={projection}
            geoPath={geoPath}
            renderPoint={renderPoint}
            renderObjectPoint={renderObjectPoint}
            renderConnectionPoint={renderConnectionPoint}
            renderConnectionLine={renderConnectionLine}
            onObjectSelect={handleObjectSelect}
            onObjectHover={handleObjectHover}
          />
        </svg>
      )}
      {renderZoomOutButton && selectedObjectId && renderZoomOutButton({ onClick: handleZoomOut })}
    </div>
  )
}
