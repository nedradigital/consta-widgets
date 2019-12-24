import React, { useMemo } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { GeoObject } from '../../'

import css from './index.css'

type Props = {
  objects: readonly GeoObject[]
  geoPath: d3.GeoPath
  isObjectHovered: (object: GeoObject) => boolean
  isObjectSelected: (object: GeoObject) => boolean
  isObjectSelectable: (object: GeoObject) => boolean
  onObjectSelect: (object: GeoObject) => void
  onObjectHover: (object?: GeoObject) => void
}

export const MapObjects: React.FC<Props> = ({
  objects,
  geoPath,
  isObjectHovered,
  isObjectSelected,
  isObjectSelectable,
  onObjectSelect,
  onObjectHover,
}) => {
  const paths: ReadonlyArray<string | undefined> = useMemo(
    () => objects.map(object => geoPath(object.geoData) || undefined),
    [objects, geoPath]
  )

  return (
    <g>
      {objects.map((object, idx) => {
        const mouseHandlers = isObjectSelectable(object)
          ? {
              onMouseEnter: () => onObjectHover(object),
              onMouseLeave: () => onObjectHover(undefined),
            }
          : {}

        return (
          <path
            key={object.id}
            d={paths[idx]}
            className={classnames(
              css.item,
              object.id === 'RU' && css.russia,
              isObjectHovered(object) && css.isHovered,
              isObjectSelected(object) && css.isSelected,
              isObjectSelectable(object) && css.isSelectable
            )}
            onClick={() => onObjectSelect(object)}
            {...mouseHandlers}
          />
        )
      })}
    </g>
  )
}
