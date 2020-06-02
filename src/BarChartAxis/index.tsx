import React, { useRef } from 'react'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { FormatValue } from '@/common/types'
import { Scaler } from '@/common/utils/scale'
import { TextSize } from '@/common/utils/ui-kit'
import { UnitPosition } from '@/core/BarChart'
import { useBaseSize } from '@/BaseSizeContext'
import { Position, Size, Ticks } from '@/Ticks'

import css from './index.css'

export type ShowPositions = {
  [key in Position]: boolean
}

type Props = {
  values: readonly number[]
  labels: readonly string[]
  valuesScaler: Scaler<number>
  labelsScaler: Scaler<string>
  isHorizontal?: boolean
  showPositions?: ShowPositions
  showValueLine?: boolean
  showLabelLine?: boolean
  showValues?: boolean
  unit?: string
  unitPosition?: UnitPosition
  size: Size
  horizontalStyles?: React.CSSProperties
  verticalStyles?: React.CSSProperties
  bottomControls?: React.ReactNode
  formatValue?: FormatValue
  isNegative?: boolean
}

const unitSize: Record<Size, TextSize> = {
  s: '2xs',
  m: 'xs',
}

const defaultShow: ShowPositions = {
  top: false,
  right: false,
  bottom: true,
  left: true,
}

const PADDING = 6

const renderUnit = (className: string, unit: string, size: Size) => (
  <Text tag="div" size={unitSize[size]} view="secondary" className={className}>
    {unit}
  </Text>
)

export const Axis: React.FC<Props> = ({
  children,
  labels,
  labelsScaler,
  values,
  valuesScaler,
  isHorizontal,
  showPositions = defaultShow,
  showValueLine = true,
  showLabelLine = false,
  unit,
  unitPosition,
  size,
  horizontalStyles = {},
  verticalStyles = {},
  formatValue,
  showValues,
  isNegative,
}) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const getStyles = (position: Position) => {
    return position === 'top' || position === 'bottom' ? horizontalStyles : verticalStyles
  }

  const renderValues = (position: Position) => (
    <Ticks
      values={values}
      scaler={valuesScaler}
      position={position}
      size={size}
      showLine={showValueLine}
      formatValueForLabel={formatValue}
      style={getStyles(position)}
    />
  )

  const renderLabels = (position: Position) => (
    <Ticks
      values={labels}
      scaler={labelsScaler}
      position={position}
      size={size}
      showLine={showLabelLine}
      style={getStyles(position)}
    />
  )

  const renderHorizontal = isHorizontal ? renderValues : renderLabels
  const renderVertical = isHorizontal ? renderLabels : renderValues

  const showUnitLeft =
    unitPosition !== 'none' && (unitPosition === 'left' || unitPosition === 'left-and-bottom')
  const showUnitBottom =
    unitPosition !== 'none' && (unitPosition === 'bottom' || unitPosition === 'left-and-bottom')

  const padding = getCalculatedSizeWithBaseSize(PADDING)

  const classNameIndent = isNegative && showValues && css.showValue

  return (
    <div
      ref={mainRef}
      className={classnames(
        css.main,
        size &&
          {
            s: css.sizeS,
            m: '',
          }[size]
      )}
      style={{
        paddingTop: !showUnitLeft && !showPositions.top ? padding : 0,
        paddingBottom: !showUnitBottom && !showPositions.bottom ? padding : 0,
      }}
    >
      {unit && showUnitLeft && renderUnit(css.topLeftUnit, unit, size)}
      <div className={classnames(css.topTicks, classNameIndent)}>
        {showPositions.top && renderHorizontal('top')}
      </div>
      <div className={css.rightTicks}>{showPositions.right && renderVertical('right')}</div>
      <div className={css.graph}>{children}</div>
      <div className={classnames(css.bottomTicks, classNameIndent)}>
        {showPositions.bottom && renderHorizontal('bottom')}
      </div>
      <div className={css.leftTicks}>{showPositions.left && renderVertical('left')}</div>
      {unit && showUnitBottom && renderUnit(css.bottomUnit, unit, size)}
    </div>
  )
}
