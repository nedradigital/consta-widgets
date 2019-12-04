import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

import russiaHigh from '@amcharts/amcharts4-geodata/russiaCrimeaHigh'
import russiaLow from '@amcharts/amcharts4-geodata/russiaCrimeaLow'
import worldHigh from '@amcharts/amcharts4-geodata/worldHigh'
import worldLow from '@amcharts/amcharts4-geodata/worldLow'
import worldUltra from '@amcharts/amcharts4-geodata/worldUltra'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import * as d3 from 'd3'
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3'

import { Tooltip } from '@/components/Tooltip'

import css from './index.css'
import { ruNames } from './ru-geo-names'

type ExtendedFeatureOrCollection = ExtendedFeature | ExtendedFeatureCollection

export type GeoObjectLocation = {
  id: string
  type: 'location'
  geoData: ExtendedFeature
  parentId: string
}

export type GeoObject =
  | {
      id: string
      type: 'country' | 'region'
      geoData: ExtendedFeatureOrCollection
    }
  | GeoObjectLocation

type Props = {
  locations: readonly GeoObjectLocation[]
}

type Zoom = {
  scale: number
  translateX: number
  translateY: number
}

const CENTERING_PADDING = 30
const SPB_COORDS = [30.311515, 59.942568] as const
const ZOOM_HIGH_THRESHOLD = 3000

const featureToObject = (type: 'country' | 'region') => (feature: ExtendedFeature): GeoObject => ({
  type,
  id: String(feature.id),
  geoData: feature,
})

export const getObjectName = (object: GeoObject | undefined): string | undefined => {
  if (!object) {
    return
  }

  const ruName = ruNames[object.id]
  if (ruName) {
    return ruName
  }

  if ('properties' in object.geoData && object.geoData.properties) {
    return object.geoData.properties.name
  }
}

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
  selectedObject: GeoObject | undefined
) => {
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

export const Map: React.FC<Props> = ({ locations }) => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredObjectId, setHoveredObjectId] = useState<string>()
  const [selectedObjectId, setSelectedObjectId] = useState<string>()
  const [zoom, setZoom] = useState<Zoom | undefined>()
  const [isZooming, setIsZooming] = useState(false)

  const [world, russia] = getMaps(isZooming, zoom && zoom.scale)
  const worldWithoutRussia = useMemo(
    () => ({
      ...world,
      features: world.features.filter(f => f.id !== 'RU'),
    }),
    [world]
  )

  const isClickable = (object: GeoObject): boolean =>
    object.id !== selectedObjectId &&
    (object.type === 'location' || locations.some(loc => loc.parentId === object.id))

  const getProjection = useCallback(() => {
    return d3
      .geoMercator()
      .fitSize([width, height], world)
      .clipExtent([[0, 0], [width, height]])
      .rotate([-90, 0])
  }, [width, height])

  const projection = useMemo(() => {
    const p = getProjection()

    if (zoom) {
      p.scale(zoom.scale).translate([zoom.translateX, zoom.translateY])
    }

    return p
  }, [getProjection, zoom])

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

  const hoveredObject = allObjects.find(o => o.id === hoveredObjectId)
  const hoveredObjectName = getObjectName(hoveredObject)
  const selectedObject = allObjects.find(o => o.id === selectedObjectId)

  const visibleObjects = useMemo(() => getVisibleObjects(allObjects, selectedObject), [
    allObjects,
    selectedObject,
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

  const objectsWithPoints = useMemo(
    () =>
      selectedObjectId
        ? locations.filter(loc => loc.parentId === selectedObjectId)
        : visibleObjects.filter(isClickable),
    [visibleObjects, locations, selectedObjectId]
  )

  const points = useMemo(() => {
    return objectsWithPoints.map(object => {
      const coords = d3.geoCentroid(object.geoData as ExtendedFeature)
      const [x, y] = projection(coords) || [0, 0]

      const linePath =
        geoPath({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [[...SPB_COORDS], coords],
          },
          properties: {},
        }) || undefined
      return { object, x, y, linePath }
    })
  }, [objectsWithPoints, geoPath, projection])

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const getMouseHandlers = (object: GeoObject) => {
    if (isClickable(object)) {
      return {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation()
          setSelectedObjectId(object.id)
          setHoveredObjectId(undefined)
        },
        onMouseEnter: () => setHoveredObjectId(object.id),
        onMouseLeave: () => setHoveredObjectId(undefined),
      }
    }

    if (selectedObjectId === object.id) {
      return {
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      }
    }

    return undefined
  }

  // Анимация зума
  useLayoutEffect(() => {
    if (!width || !height) {
      return
    }

    const featureToZoomOn = selectedObject
      ? selectedObject.geoData
      : {
          type: 'FeatureCollection',
          features: visibleObjects.filter(isClickable).map(o => o.geoData),
        }
    const targetProjection = getProjection().fitExtent(
      [
        [CENTERING_PADDING, CENTERING_PADDING],
        [width - CENTERING_PADDING, height - CENTERING_PADDING],
      ],
      featureToZoomOn as ExtendedFeature
    )
    const [targetTrX, targetTrY] = targetProjection.translate()
    const targetZoom = {
      scale: targetProjection.scale(),
      translateX: targetTrX,
      translateY: targetTrY,
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
  }, [
    // Тут нельзя делать зависимость от selectedObject, т.к. его изменения зацикливают событие зума
    // (во время зума снижается детализация мира и из-за этого обновляется геометрия selectedObject, хотя selectedObjectId остаётся тем же)
    selectedObjectId,
    getProjection,
  ])

  return (
    <div ref={ref} className={css.main}>
      {width && height && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={css.svg}
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedObjectId(undefined)}
        >
          {paths.map(item => (
            <path
              key={item.object.id}
              d={item.d}
              className={classnames(
                css.item,
                item.className,
                item.object.id === hoveredObjectId && css.isHovered,
                item.object.id === selectedObjectId && css.isSelected,
                isClickable(item.object) && css.isClickable
              )}
              {...getMouseHandlers(item.object)}
            />
          ))}

          {points.map(point => (
            <path key={point.object.id} d={point.linePath} className={css.line} />
          ))}

          {points.map(point => (
            <circle
              key={point.object.id}
              cx={point.x}
              cy={point.y}
              r={8}
              className={css.circle}
              {...getMouseHandlers(point.object)}
            />
          ))}
        </svg>
      )}

      {hoveredObjectName && (
        <Tooltip isVisible direction="top" x={mousePosition.x} y={mousePosition.y}>
          {hoveredObjectName}
        </Tooltip>
      )}
    </div>
  )
}
