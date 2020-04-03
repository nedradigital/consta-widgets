import { Button, IconBackward, IconForward } from '@gpn-design/uikit'

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
  const Icon = direction === 'backward' ? IconBackward : IconForward

  return (
    <Button
      className={css.button}
      wpSize="m"
      view="clear"
      iconOnly
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size="m" />
    </Button>
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
