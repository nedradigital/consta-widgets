import { Position } from '@/Tooltip'

import { Group } from '../..'
import { Line } from '../Line'
import { RoadmapTooltip } from '../RoadmapTooltip'

type Props = {
  color: string
  group: Group
  monthWidth: number
  isActive: boolean
  isInactive: boolean
  graphStartDate: number
  withMargin: boolean
  tooltipPosition: Position
  onClick: React.MouseEventHandler<HTMLDivElement>
  onTooltipRequestReposition: () => void
}

export const GroupLines: React.FC<Props> = ({
  color,
  group,
  monthWidth,
  isActive,
  isInactive,
  graphStartDate,
  withMargin,
  tooltipPosition,
  onClick,
  onTooltipRequestReposition,
}) => {
  const interactiveLineRef = React.useRef<HTMLDivElement>(null)

  const { plan, fact, forecast, title, comment } = group

  const interactiveLineStartDate = fact?.startDate || forecast?.startDate
  const interactiveLineEndDate = forecast?.endDate || fact?.endDate

  const defaultProps = {
    monthWidth,
    graphStartDate,
    withMargin,
  }

  return (
    <>
      {plan && (
        <Line
          color={color}
          startDate={plan.startDate}
          endDate={plan.endDate}
          view="plan"
          isInactive={isActive || isInactive}
          {...defaultProps}
        />
      )}
      {fact && (
        <Line
          color={color}
          startDate={fact.startDate}
          endDate={fact.endDate}
          view="fact"
          isActive={isActive}
          isInactive={isInactive}
          {...defaultProps}
        />
      )}
      {forecast && (
        <Line
          color={color}
          startDate={forecast.startDate}
          endDate={forecast.endDate}
          view="forecast"
          isActive={isActive}
          isInactive={isInactive}
          {...defaultProps}
        />
      )}
      {interactiveLineStartDate && interactiveLineEndDate && (
        <Line
          ref={interactiveLineRef}
          startDate={interactiveLineStartDate}
          endDate={interactiveLineEndDate}
          onClick={onClick}
          {...defaultProps}
        />
      )}
      {isActive && tooltipPosition && (
        <RoadmapTooltip
          anchorRef={interactiveLineRef}
          color={color}
          title={title}
          comment={comment}
          fact={fact}
          forecast={forecast}
          plan={plan}
          position={tooltipPosition}
          onRequestReposition={onTooltipRequestReposition}
        />
      )}
    </>
  )
}
