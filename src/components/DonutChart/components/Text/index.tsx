import React from 'react'
import { Textfit } from 'react-textfit'

import classnames from 'classnames'

import { useBaseSize } from '@/contexts'

import {
  isHalfDonutHorizontal as getIsHorizontal,
  isHalfDonutVertical as getIsVertical,
} from '../../helpers'
import { HalfDonut } from '../Donut'

import {
  getContentBorderRadius,
  getValueMaxFontSize,
  getValueMaxWidth,
  MIN_FONT_SIZE,
  SUBVALUE_FONT_SIZE_RATIO,
  TITLE_FONT_SIZE_RATIO,
  VALUE_MAX_FONT_SIZE,
} from './helpers'
import css from './index.css'

export type Data = {
  value: string
  title?: string
  subTitle?: string
  subValue?: string
}

type Props = {
  data: Data
  radius: number
  lineWidth: number
  position?: HalfDonut
}

export const DonutText: React.FC<Props> = ({ data, radius, lineWidth, position }) => {
  const [baseFontSize, setBaseFontSize] = React.useState(0)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const isHorizontal = getIsHorizontal(position)
  const isVertical = getIsVertical(position)
  const isSubBlock = isVertical && data.subTitle && data.subValue
  const diameter = radius * 2
  const paddingFromLine = position ? lineWidth : 0
  const paddingFromBorder = position ? getCalculatedSizeWithBaseSize(8) : 0
  const titleFontSize = Math.round(baseFontSize * TITLE_FONT_SIZE_RATIO)
  const subValueFontSize = Math.round(baseFontSize * SUBVALUE_FONT_SIZE_RATIO)
  const valueMaxSize = getValueMaxFontSize({
    diameter: diameter - paddingFromLine - paddingFromBorder,
    maxFontSize: getCalculatedSizeWithBaseSize(VALUE_MAX_FONT_SIZE),
    position,
  })
  const valueMaxWidth = getValueMaxWidth(diameter, position)

  const elements = [
    position ? (
      <div key="title" className={css.title} style={{ fontSize: `${titleFontSize}px` }}>
        {data.title}
      </div>
    ) : null,
    valueMaxSize > 0 ? (
      <Textfit
        key="value"
        className={css.value}
        mode="single"
        min={getCalculatedSizeWithBaseSize(MIN_FONT_SIZE)}
        max={valueMaxSize}
        style={{ maxWidth: valueMaxWidth ? `${valueMaxWidth}px` : undefined }}
        onReady={setBaseFontSize}
      >
        {data.value}
      </Textfit>
    ) : null,
  ] as const

  const contentStyle: React.CSSProperties = {
    maxWidth: isVertical ? radius : diameter,
    maxHeight: isHorizontal ? radius : diameter,
    borderRadius: getContentBorderRadius(radius, position),
  }

  return (
    <div
      className={classnames(css.main, position && css.withPosition, position && css[position])}
      style={{
        ['--padding-from-border' as string]: `${paddingFromBorder}px`,
      }}
    >
      <div className={css.content} style={contentStyle}>
        {position === 'bottom' ? [...elements].reverse() : elements}
        {isSubBlock && (
          <>
            <div className={css.title} style={{ fontSize: `${titleFontSize}px` }}>
              {data.subTitle}
            </div>
            <div className={css.subvalue} style={{ fontSize: `${subValueFontSize}px` }}>
              {data.subValue}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
