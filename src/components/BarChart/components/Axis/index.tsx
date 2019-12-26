import classnames from 'classnames'

import { Position, Scaler, Ticks } from '@/components/Ticks'

import css from './index.css'

type ShowPositions = {
  [key in Position]: boolean
}

type Props = {
  ticks: readonly number[]
  labels: readonly string[]
  ticksScaler: Scaler<number>
  labelsScaler: Scaler<string>
  isHorizontal?: boolean
  showPositions?: ShowPositions
  showTickLine?: boolean
  showLabelLine?: boolean
  showUnitLeft?: boolean
  showUnitBottom?: boolean
  unit?: string
  horizontalStyles?: React.CSSProperties
  verticalStyles?: React.CSSProperties
}

const defaultShow: ShowPositions = {
  top: false,
  right: false,
  bottom: true,
  left: true,
}

const HORIZONTAL_POSITIONS: readonly Position[] = ['left', 'right']
const VERTICAL_POSITIONS: readonly Position[] = ['top', 'bottom']

const positionClass = {
  top: css.topTicks,
  right: css.rightTicks,
  bottom: css.bottomTicks,
  left: css.leftTicks,
}

const getPositionsForShow = (positions: readonly Position[], showing: ShowPositions) => {
  return positions.filter(position => showing[position])
}

const renderUnit = (className: string, unit: string) => (
  <div className={classnames(css.unit, className)}>{unit}</div>
)

export const Axis: React.FC<Props> = ({
  children,
  labels,
  labelsScaler,
  ticks,
  ticksScaler,
  isHorizontal,
  showPositions = defaultShow,
  showTickLine = true,
  showLabelLine = false,
  unit,
  showUnitLeft,
  showUnitBottom,
  horizontalStyles = {},
  verticalStyles = {},
}) => {
  const labelPosition = getPositionsForShow(
    isHorizontal ? HORIZONTAL_POSITIONS : VERTICAL_POSITIONS,
    showPositions
  )
  const ticksPosition = getPositionsForShow(
    isHorizontal ? VERTICAL_POSITIONS : HORIZONTAL_POSITIONS,
    showPositions
  )

  const getStyles = (position: Position) => {
    return position === 'top' || position === 'bottom' ? horizontalStyles : verticalStyles
  }

  return (
    <div className={css.wrapper}>
      {unit && showUnitLeft && renderUnit(css.topLeft, unit)}
      {labelPosition.map((position, idx) => (
        <Ticks
          className={positionClass[position]}
          key={idx}
          values={labels}
          scaler={labelsScaler}
          position={position}
          showLine={showLabelLine}
          style={getStyles(position)}
        />
      ))}
      {ticksPosition.map((position, idx) => (
        <Ticks
          className={positionClass[position]}
          key={idx}
          values={ticks}
          scaler={ticksScaler}
          position={position}
          showLine={showTickLine}
          isTicksSnuggleOnEdge={isHorizontal}
          style={getStyles(position)}
        />
      ))}
      <div className={css.main}>{children}</div>
      {unit && showUnitBottom && renderUnit(css.bottomUnit, unit)}
    </div>
  )
}
