import { useRef } from 'react'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Position, Size, Ticks } from '@/components/Ticks'
import { useBaseSize } from '@/contexts'
import { FormatValue } from '@/dashboard'
import { BarChartParams } from '@/dashboard/widget-params'
import { Scaler } from '@/utils/scale'

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
  unit?: string
  unitPosition?: BarChartParams['unitPosition']
  size?: Size
  horizontalStyles?: React.CSSProperties
  verticalStyles?: React.CSSProperties
  bottomControls?: React.ReactNode
  formatValue?: FormatValue
}

const defaultShow: ShowPositions = {
  top: false,
  right: false,
  bottom: true,
  left: true,
}

const PADDING = 6

const renderUnit = (className: string, unit: string) => (
  <Text tag="div" size="xs" view="secondary" className={className}>
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
      {unit && showUnitLeft && renderUnit(css.topLeftUnit, unit)}
      <div className={css.topTicks}>{showPositions.top && renderHorizontal('top')}</div>
      <div className={css.rightTicks}>{showPositions.right && renderVertical('right')}</div>
      <div className={css.graph}>{children}</div>
      <div className={css.bottomTicks}>{showPositions.bottom && renderHorizontal('bottom')}</div>
      <div className={css.leftTicks}>{showPositions.left && renderVertical('left')}</div>
      {unit && showUnitBottom && renderUnit(css.bottomUnit, unit)}
    </div>
  )
}
