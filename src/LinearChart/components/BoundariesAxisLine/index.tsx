import { XLabelsPosition, YLabelsPosition } from '../Axis'

const getLinePosition = ({
  isHorizontal,
  xLabelsPos,
  yLabelsPos,
}: {
  isHorizontal: boolean
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
}) => {
  if (isHorizontal && yLabelsPos === 'right') {
    return {
      x1: '100%',
      y1: '0%',
      x2: '100%',
      y2: '100%',
    }
  }

  if (isHorizontal && yLabelsPos === 'left') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
    }
  }

  if (!isHorizontal && xLabelsPos === 'top') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '0%',
    }
  }

  if (!isHorizontal && xLabelsPos === 'bottom') {
    return {
      x1: '0%',
      y1: '100%',
      x2: '100%',
      y2: '100%',
    }
  }
}

type Props = {
  isHorizontal: boolean
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
  boundariesGradientId: string
}

export const BoundariesAxisLine: React.FC<Props> = ({
  isHorizontal,
  xLabelsPos,
  yLabelsPos,
  boundariesGradientId,
}) => {
  const position = getLinePosition({ isHorizontal, xLabelsPos, yLabelsPos })

  if (!position) {
    return null
  }

  return <line stroke={`url(#${boundariesGradientId})`} strokeWidth="2" {...position} />
}
