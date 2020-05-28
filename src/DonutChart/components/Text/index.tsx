import React from 'react'
import { Textfit } from 'react-textfit'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'

import { useBaseSize } from '@/BaseSizeContext'

import {
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
} from '../../helpers'
import { HalfDonut } from '../Donut'

import {
  getContentBorderRadius,
  getContentHeight,
  getValueHeightRatio,
  getValueMaxFontSize,
  getValueMaxWidth,
  MARGIN_FROM_LINE,
  MIN_FONT_SIZE,
  SUBVALUE_FONT_SIZE_RATIO,
  TITLE_FONT_SIZE_RATIO,
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
  halfDonut?: HalfDonut
}

export const DonutText: React.FC<Props> = ({ data, radius, lineWidth, halfDonut }) => {
  const [baseFontSize, setBaseFontSize] = React.useState(0)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const isHalfDonutHorizontal = getIsHalfDonutHorizontal(halfDonut)
  const isHalfDonutVertical = getIsHalfDonutVertical(halfDonut)
  const isSubBlock = isHalfDonutVertical && data.subTitle && data.subValue
  const diameter = radius * 2
  const paddingFromLine = halfDonut ? lineWidth : getCalculatedSizeWithBaseSize(7)
  const paddingFromBorder = halfDonut ? getCalculatedSizeWithBaseSize(8) : 0
  const titleFontSize = Math.round(baseFontSize * TITLE_FONT_SIZE_RATIO)
  const subValueFontSize = Math.round(baseFontSize * SUBVALUE_FONT_SIZE_RATIO)
  const contentHeight = getContentHeight({
    diameter,
    radius,
    isHalfDonutHorizontal,
    isHalfDonutVertical,
    paddingFromBorder,
    paddingFromLine,
  })
  const contentHeightValueRatio = getValueHeightRatio({
    isHalfDonutHorizontal,
    isHalfDonutVertical,
    titleIsExist: isDefined(data.title),
  })
  const valueMaxSize = getValueMaxFontSize({
    height: contentHeight,
    ratio: contentHeightValueRatio,
  })
  const valueMaxWidth = isHalfDonutHorizontal ? `${getValueMaxWidth(diameter)}px` : undefined

  const contentStyle: React.CSSProperties = {
    maxWidth: (isHalfDonutVertical ? radius : diameter) - MARGIN_FROM_LINE,
    maxHeight: (isHalfDonutHorizontal ? radius : diameter) - MARGIN_FROM_LINE,
    borderRadius: getContentBorderRadius(radius, halfDonut),
  }

  const elements = [
    halfDonut ? (
      <div key="title" className={css.title} style={{ fontSize: `${titleFontSize}px` }}>
        {data.title}
      </div>
    ) : null,
    valueMaxSize > 0 ? (
      <Textfit
        key="value"
        className={css.value}
        mode="single"
        min={MIN_FONT_SIZE}
        max={valueMaxSize}
        style={{ maxWidth: valueMaxWidth }}
        onReady={setBaseFontSize}
      >
        {data.value}
      </Textfit>
    ) : null,
  ] as const

  return (
    <div
      className={classnames(css.main, halfDonut && css.withPosition, halfDonut && css[halfDonut])}
      style={{
        ['--padding-from-line' as string]: `${paddingFromLine}px`,
        ['--padding-from-border' as string]: `${paddingFromBorder}px`,
      }}
    >
      <div className={css.content} style={contentStyle}>
        {halfDonut === 'bottom' ? [...elements].reverse() : elements}
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
