import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'

import russiaHigh from '@amcharts/amcharts4-geodata/russiaCrimeaHigh'
import russiaLow from '@amcharts/amcharts4-geodata/russiaCrimeaLow'
import worldHigh from '@amcharts/amcharts4-geodata/worldHigh'
import worldLow from '@amcharts/amcharts4-geodata/worldLow'
import worldUltra from '@amcharts/amcharts4-geodata/worldUltra'
import { isDefined } from '@gaz/utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import * as d3 from 'd3'
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3'
import { LineString, MultiPoint } from 'geojson'

import css from './index.css'

type ExtendedFeatureOrCollection = ExtendedFeature | ExtendedFeatureCollection

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

type Coords = readonly [number, number]

export type GeoPoint = {
  id: string
  parentId: string | undefined
  connectionPointId?: string
  coords: Coords
  name: string
}

type Line = {
  d: string
  measure: number
}

type CommonCircleParams = {
  x: number
  y: number
  lines?: readonly Line[]
}

type ObjectCircle = CommonCircleParams & {
  object: GeoObject
  pointsInsideObject: readonly GeoPoint[]
}

type PointCircle = CommonCircleParams & {
  point: GeoPoint
}

export type ConnectionPoint = {
  id: string
  coords: Coords
  name: string
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
) => React.ReactNode
export type RenderConnectionPoint = (connectionPoint: ConnectionPoint) => React.ReactNode
type SelectedObjectId = string | undefined

export type Data = {
  points: readonly GeoPoint[]
  locations?: readonly GeoObjectLocation[]
  connectionPoints?: readonly ConnectionPoint[]
  /** Отступы от краёв карты до объекта центрирования: [вертикальный, горизонтальный] */
  padding: readonly [number, number]
  /** id выбранной страны, региона или локации */
  selectedObjectId: SelectedObjectId
  allowClickOnSelectedObject?: boolean
  onSelectedObjectIdChange: (selectedObjectId: SelectedObjectId) => void
  renderPoint: RenderPoint
  renderObjectPoint?: RenderObjectPoint
  renderConnectionPoint?: RenderConnectionPoint
}

type Props = Data

type Zoom = {
  scale: number
  translateX: number
  translateY: number
}

const ZOOM_HIGH_THRESHOLD = 3000

const featureToObject = (type: 'country' | 'region') => (feature: ExtendedFeature): GeoObject => ({
  type,
  id: String(feature.id),
  geoData: feature,
})

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

const getLine = (geoPath: d3.GeoPath, coords1: Coords, coords2: Coords): Line | undefined => {
  const lineString: ExtendedFeature<LineString> = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[...coords1], [...coords2]],
    },
    properties: {},
  }
  const d = geoPath(lineString)
  return d
    ? {
        d,
        measure: geoPath.measure(lineString),
      }
    : undefined
}

const isPointCircle = (circle: PointCircle | ObjectCircle): circle is PointCircle =>
  'point' in circle

const geoCoordsToPixels = (
  projection: d3.GeoProjection,
  geoCoords: Coords
): { x: number; y: number } | undefined => {
  const pixelCoords = projection([geoCoords[0], geoCoords[1]])
  return pixelCoords ? { x: pixelCoords[0], y: pixelCoords[1] } : undefined
}

const getProjection = (width: number, height: number): d3.GeoProjection => {
  return d3
    .geoMercator()
    .clipExtent([[0, 0], [width, height]])
    .rotate([-60, 0])
}

const GEOPOINT_ZOOM_DELTA = 30
const geoPointsToExtendedFeature = (
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
}) => {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [hoveredObjectId, setHoveredObjectId] = useState<string>()
  const [zoom, setZoom] = useState<Zoom | undefined>()
  const [isZooming, setIsZooming] = useState(false)
  const setSelectedObjectId = (newId: SelectedObjectId) => onSelectedObjectIdChange(newId)

  const [world, russia] = getMaps(isZooming, zoom && zoom.scale)
  const worldWithoutRussia = useMemo(
    () => ({
      ...world,
      features: world.features.filter(f => f.id !== 'RU'),
    }),
    [world]
  )

  const isSelectable = (object: GeoObject): boolean =>
    (allowClickOnSelectedObject || object.id !== selectedObjectId) &&
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

  const paths: ReadonlyArray<{
    object: GeoObject
    d?: string
    className?: string
  }> = useMemo(() => {
    return visibleObjects.map(object => ({
      object,
      d: geoPath(object.geoData) || undefined,
      className: object.id === 'RU' ? css.russia : undefined,
    }))
  }, [visibleObjects, geoPath])

  const objectsWithCircles = selectedObjectId
    ? locations.filter(loc => loc.parentId === selectedObjectId)
    : visibleObjects.filter(isSelectable)

  const objectCircles: readonly ObjectCircle[] = objectsWithCircles
    .map(object => {
      const pointsInsideObject = (() => {
        switch (object.type) {
          case 'country':
          case 'region':
            return [
              // Точки внутри региона
              ...points.filter(p => p.parentId === object.id),
              // Точки внутри локаций региона
              ...locations
                .filter(l => l.parentId === object.id)
                .map(l => points.filter(p => p.parentId === l.id))
                .flat(),
            ]
          case 'location':
            return points.filter(p => p.parentId === object.id)
        }
      })()

      const coords = d3.geoCentroid(geoPointsToExtendedFeature(pointsInsideObject))
      const pixelCoords = geoCoordsToPixels(projection, coords)

      if (!pixelCoords) {
        return undefined
      }

      const { x, y } = pixelCoords

      const connectedPoints = connectionPoints.filter(connectionPoint =>
        pointsInsideObject.some(point => point.connectionPointId === connectionPoint.id)
      )

      return {
        object,
        pointsInsideObject,
        x,
        y,
        lines: connectedPoints
          .map(connectedPoint => getLine(geoPath, connectedPoint.coords, coords))
          .filter(isDefined),
      }
    })
    .filter(isDefined)

  const pointCircles: readonly PointCircle[] = points
    .filter(point => point.parentId === selectedObjectId)
    .map(point => {
      const pixelCoords = geoCoordsToPixels(projection, point.coords)

      if (!pixelCoords) {
        return undefined
      }

      const { x, y } = pixelCoords
      const theConnectionPoint = connectionPoints.find(
        connectionPoint => connectionPoint.id === point.connectionPointId
      )
      const theLine = theConnectionPoint
        ? getLine(geoPath, theConnectionPoint.coords, point.coords)
        : undefined

      return {
        point,
        x,
        y,
        lines: theLine ? [theLine] : undefined,
      }
    })
    .filter(isDefined)

  const allCircles = [...objectCircles, ...pointCircles] as const

  // Анимация зума
  useLayoutEffect(() => {
    if (!width || !height) {
      return
    }

    const selectedObject = allObjects.find(o => o.id === selectedObjectId)
    const featureToZoomOn = selectedObject
      ? selectedObject.geoData
      : geoPointsToExtendedFeature(points, true)
    const [paddingY, paddingX] = padding
    const targetProjection = getProjection(width, height).fitExtent(
      [[paddingX, paddingY], [width - paddingX, height - paddingY]],
      featureToZoomOn as ExtendedFeature
    )
    const [targetTrX, targetTrY] = targetProjection.translate()
    const targetZoom = {
      scale: targetProjection.scale(),
      translateX: targetTrX,
      translateY: targetTrY,
    }

    if (!targetZoom.scale) {
      return
    }

    if (zoom) {
      d3.select(ref.current)
        .transition()
        .duration(1000)
        .tween('mapZoomTween', () => {
          const initialZoom = { ...zoom }
          const i = d3.interpolateObject(initialZoom, targetZoom)

          return (t: number) => {
            setZoom({ ...i(t) })
          }
        })
        .on('start', () => {
          setIsZooming(true)
        })
        .on('end', () => {
          setIsZooming(false)
        })
    } else {
      // При первом рендере не анимируем
      setZoom(targetZoom)
    }

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
          {paths.map(item => {
            const isItemSelected = item.object.id === selectedObjectId
            const isItemSelectable = isSelectable(item.object)
            const mouseHandlers = isItemSelectable
              ? {
                  onMouseEnter: () => setHoveredObjectId(item.object.id),
                  onMouseLeave: () => setHoveredObjectId(undefined),
                }
              : {}

            return (
              <path
                key={item.object.id}
                d={item.d}
                className={classnames(
                  css.item,
                  item.className,
                  item.object.id === hoveredObjectId && css.isHovered,
                  isItemSelected && css.isSelected,
                  isItemSelectable && css.isSelectable
                )}
                onClick={() => {
                  if (isItemSelected) {
                    allowClickOnSelectedObject && setSelectedObjectId(item.object.id)
                  } else {
                    setSelectedObjectId(isItemSelectable ? item.object.id : undefined)
                  }
                }}
                {...mouseHandlers}
              />
            )
          })}

          {/* Все линии идут до кругов, чтобы линии всегда были под кругами */}
          {allCircles.map((circle, circleIdx) =>
            circle.lines ? (
              <g key={circleIdx}>
                {circle.lines.map(({ d, measure }, lineIdx) => (
                  <React.Fragment key={lineIdx}>
                    <path d={d} className={css.line} />
                    <path
                      d={d}
                      className={classnames(css.line, css.isAnimated)}
                      style={{
                        ['--line-length' as string]: measure,
                        animation: isZooming ? 'none' : undefined,
                        animationDelay: isZooming ? undefined : `${circleIdx}s`,
                        animationDuration: isZooming ? undefined : `${allCircles.length}s`,
                      }}
                    />
                  </React.Fragment>
                ))}
              </g>
            ) : null
          )}

          {allCircles.map((circle, idx) => {
            const { x, y } = circle

            return (
              <foreignObject key={idx} x={x} y={y}>
                <div className={css.foreignObjectWrapper}>
                  {isPointCircle(circle)
                    ? renderPoint(circle.point)
                    : renderObjectPoint(
                        circle.object,
                        { pointsInsideObject: circle.pointsInsideObject },
                        {
                          onClick: () => setSelectedObjectId(circle.object.id),
                          onMouseEnter: () => setHoveredObjectId(circle.object.id),
                          onMouseLeave: () => setHoveredObjectId(undefined),
                        }
                      )}
                </div>
              </foreignObject>
            )
          })}

          {connectionPoints.map(connectionPoint => {
            const coords = geoCoordsToPixels(projection, connectionPoint.coords)

            return coords ? (
              <foreignObject key={connectionPoint.id} x={coords.x} y={coords.y}>
                <div className={css.foreignObjectWrapper}>
                  {renderConnectionPoint(connectionPoint)}
                </div>
              </foreignObject>
            ) : null
          })}
        </svg>
      )}
    </div>
  )
}
