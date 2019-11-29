import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

import ruCountryNames from '@amcharts/amcharts4-geodata/lang/RU'
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

import { DEPOSITS, WELL_POINTS } from './example-data'
import css from './index.css'

type ExtendedFeatureOrCollection = ExtendedFeature | ExtendedFeatureCollection
type CountryCode = keyof typeof ruCountryNames

type Props = {}

type Zoom = {
  scale: number
  translateX: number
  translateY: number
}

const DEFAULT_CENTERED_OBJECT = russiaLow
const CENTERING_PADDING = 20
const SPB_COORDS = [30.311515, 59.942568] as const
const ZOOM_HIGH_THRESHOLD = 3000

const getObjectName = (object: ExtendedFeatureOrCollection | undefined): string | undefined => {
  if (!object) {
    return
  }

  if ('id' in object && object.id) {
    const countryName = ruCountryNames[object.id as CountryCode]
    if (countryName) {
      return countryName
    }
  }

  if ('properties' in object && object.properties) {
    return object.properties.name
  }
}

const isSameObject = (a: ExtendedFeatureOrCollection, b: ExtendedFeatureOrCollection): boolean =>
  'id' in a && 'id' in b && a.id === b.id

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

export const Map: React.FC<Props> = () => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredObject, setHoveredObject] = useState<ExtendedFeatureOrCollection | undefined>()
  const [centeredObject, setCenteredObject] = useState<ExtendedFeatureOrCollection | undefined>(
    DEFAULT_CENTERED_OBJECT
  )
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

  // Анимация зума
  useLayoutEffect(() => {
    if (!width || !height) {
      return
    }

    const animateToZoom = (zoomTo: Zoom) => {
      d3.select(ref.current)
        .transition()
        .duration(1000)
        .tween('mapZoomTween', () => {
          const initialZoom = { ...zoom }
          const i = d3.interpolateObject(initialZoom, zoomTo)

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
    }

    if (!centeredObject) {
      return animateToZoom({
        scale: 100,
        translateX: width / 2,
        translateY: height / 2,
      })
    }

    const targetProjection = getProjection().fitExtent(
      [
        [CENTERING_PADDING, CENTERING_PADDING],
        [width - CENTERING_PADDING, height - CENTERING_PADDING],
      ],
      centeredObject as ExtendedFeature
    )
    const [targetTrX, targetTrY] = targetProjection.translate()
    const targetZoom = {
      scale: targetProjection.scale(),
      translateX: targetTrX,
      translateY: targetTrY,
    }

    if (zoom) {
      animateToZoom(targetZoom)
    } else {
      // При первом рендере не анимируем
      setZoom(targetZoom)
    }
  }, [centeredObject, getProjection])

  const geoPath = useMemo(() => d3.geoPath(projection), [projection])

  const items: ReadonlyArray<{
    feature: ExtendedFeatureOrCollection
    d?: string
    className?: string
  }> = useMemo(() => {
    return [...worldWithoutRussia.features, russia, ...russia.features, ...DEPOSITS].map(
      feature => ({
        feature,
        d: geoPath(feature) || undefined,
        className: feature === russia ? css.russia : undefined,
      })
    )
  }, [geoPath, worldWithoutRussia, russia])

  const points = useMemo(
    () =>
      WELL_POINTS.map(point => {
        // tslint:disable-next-line:readonly-array
        const [x, y] = projection(point.geometry.coordinates as [number, number]) || [0, 0]
        return { x, y, feature: point }
      }),
    [projection]
  )

  const lines: readonly (string | null)[] = useMemo(
    () =>
      WELL_POINTS.map(point =>
        geoPath({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [[...SPB_COORDS], point.geometry.coordinates],
          },
          properties: {},
        })
      ),
    [geoPath]
  )

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const hoveredObjectName = getObjectName(hoveredObject)

  return (
    <div ref={ref} className={css.main}>
      {width && height && (
        <svg viewBox={`0 0 ${width} ${height}`} className={css.svg} onMouseMove={handleMouseMove}>
          {items.map((item, idx) => (
            <path
              key={idx}
              d={item.d}
              className={classnames(
                css.item,
                item.className,
                centeredObject && isSameObject(centeredObject, item.feature) && css.isSelected
              )}
              onMouseEnter={() => setHoveredObject(item.feature)}
              onMouseLeave={() => setHoveredObject(undefined)}
              onClick={() => setCenteredObject(item.feature)}
            />
          ))}

          {lines.map((line, idx) => line && <path key={idx} d={line} className={css.line} />)}

          {points.map((point, idx) => (
            <circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r={18}
              onMouseEnter={() => setHoveredObject(point.feature)}
              onMouseLeave={() => setHoveredObject(undefined)}
              className={css.circle}
            />
          ))}
        </svg>
      )}
      {centeredObject !== DEFAULT_CENTERED_OBJECT && (
        <button
          type="button"
          className={css.resetZoom}
          onClick={() => setCenteredObject(DEFAULT_CENTERED_OBJECT)}
        >
          RESET ZOOM
        </button>
      )}
      {hoveredObjectName && (
        <Tooltip isVisible direction="top" x={mousePosition.x} y={mousePosition.y}>
          {hoveredObjectName}
        </Tooltip>
      )}
    </div>
  )
}
