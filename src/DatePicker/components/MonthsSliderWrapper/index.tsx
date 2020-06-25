import { Button } from '@gpn-design/uikit/Button'
import { IconBackward } from '@gpn-design/uikit/IconBackward'
import { IconForward } from '@gpn-design/uikit/IconForward'

import css from './index.css'

type MonthsPanelProps = {
  children: React.ReactNode
  onMovePrev: () => void
  isMovePrevDisabled: boolean
  onMoveNext: () => void
  isMoveNextDisabled: boolean
}

const MovePeriodButton: React.FC<{
  direction: 'backward' | 'forward'
  onClick: () => void
  disabled: boolean
}> = ({ direction, onClick, disabled }) => {
  return (
    <Button
      className={css.button}
      size="m"
      view="clear"
      onlyIcon
      iconLeft={direction === 'backward' ? IconBackward : IconForward}
      iconSize="m"
      disabled={disabled}
      onClick={onClick}
    />
  )
}

export const MonthsSliderWrapper: React.FC<MonthsPanelProps> = ({
  children,
  onMovePrev,
  isMovePrevDisabled,
  onMoveNext,
  isMoveNextDisabled,
}) => {
  return (
    <div className={css.main}>
      <MovePeriodButton direction="backward" onClick={onMovePrev} disabled={isMovePrevDisabled} />
      {children}
      <MovePeriodButton direction="forward" onClick={onMoveNext} disabled={isMoveNextDisabled} />
    </div>
  )
}
