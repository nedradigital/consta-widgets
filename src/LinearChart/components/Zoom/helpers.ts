import { defaultZoom, ZoomState } from './'

const clampZoom = (zoom: ZoomState): ZoomState => {
  const [start, end] = zoom
  const diff = end - start
  if (end > 1) {
    return [1 - diff, 1]
  }
  if (start < 0) {
    return [0, diff]
  }
  return zoom
}

export const scaleZoom = ([start, end]: ZoomState, newZoomScale: number): ZoomState => {
  if (newZoomScale === 1) {
    // Исходный зум не вычисляем, чтобы не получить чуть сдвинутое значение из-за js-округлений
    return defaultZoom
  }
  const center = start + (end - start) / 2
  const delta = 1 / newZoomScale / 2
  return clampZoom([center - delta, center + delta])
}

export const translateZoom = ([start, end]: ZoomState, delta: number): ZoomState => {
  return clampZoom([start + delta, end + delta])
}
