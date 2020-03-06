import { useRef } from 'react'

import classnames from 'classnames'

import { Position, Size, Ticks } from '@/components/Ticks'
import { useBaseSize } from '@/contexts'
import { FormatValue } from '@/dashboard/types'
import { Scaler } from '@/utils/scale'

import css from './index.css'

export const unitPositions = ['left', 'bottom', 'left-and-bottom', 'none'] as const
export type UnitPosition = typeof unitPositions[number]

type ShowPositions = {
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
  unitPosition?: UnitPosition
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
  <div className={classnames(css.unit, className)}>{unit}</div>
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
  bottomControls,
  formatValue,
}) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const getStyles = (position: Position) => {
    return position === 'top' || position === 'bottom' ? horizontalStyles : verticalStyles
  }

  const getBottomControlsWidth = () => {
    if (!mainRef.current) {
      return 0
    }

    return mainRef.current.getBoundingClientRect().width
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
      className={css.main}
      style={{
        paddingTop: !showUnitLeft && !showPositions.top ? padding : 0,
        paddingBottom: !showUnitBottom && !showPositions.bottom ? padding : 0,
      }}
    >
      {unit && showUnitLeft && renderUnit(css.topLeft, unit)}
      <div className={css.topTicks}>{showPositions.top && renderHorizontal('top')}</div>
      <div className={css.rightTicks}>{showPositions.right && renderVertical('right')}</div>
      <div className={css.graph}>{children}</div>
      <div className={css.bottomTicks}>
        {showPositions.bottom && renderHorizontal('bottom')}
        {bottomControls && (
          <div className={css.bottomControls} style={{ width: getBottomControlsWidth() }}>
            {bottomControls}
          </div>
        )}
      </div>
      <div className={css.leftTicks}>{showPositions.left && renderVertical('left')}</div>
      {unit && showUnitBottom && renderUnit(css.bottomUnit, unit)}
    </div>
  )
}
