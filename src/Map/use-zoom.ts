import { useState } from 'react'

import * as d3 from 'd3'

type Zoom = {
  scale: number
  translateX: number
  translateY: number
}

export const useZoom = () => {
  const zoomRef = React.useRef({} as Element)
  const [zoom, setZoom] = React.useState<Zoom | undefined>()
  const [isZooming, setIsZooming] = useState(false)

  const setProjection = (projection: d3.GeoProjection) => {
    const [targetTrX, targetTrY] = projection.translate()
    const targetZoom = {
      scale: projection.scale(),
      translateX: targetTrX,
      translateY: targetTrY,
    }

    if (!targetZoom.scale) {
      return
    }

    if (zoom) {
      d3.select(zoomRef.current)
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
      // При первом изменении не анимируем
      setZoom(targetZoom)
    }
  }

  return { zoom, isZooming, setProjection }
}
