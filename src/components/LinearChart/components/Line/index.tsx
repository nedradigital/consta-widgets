import classnames from 'classnames'
import * as d3 from 'd3'

import { Item, ScaleLinear } from '../..'

import css from './index.css'

type SVGPPathAttributes = Omit<React.SVGAttributes<SVGPathElement>, 'points'>

type Props = SVGPPathAttributes & {
  points: readonly Item[]
  scaleX: ScaleLinear
  scaleY: ScaleLinear
}

export const Line: React.FC<Props> = ({ points, scaleX, scaleY, className, ...rest }) => {
  const getLinePath = d3
    .line<Item>()
    .x(({ x }) => scaleX(x))
    .y(({ y }) => scaleY(y))

  return (
    <path
      className={classnames(css.line, className)}
      d={getLinePath([...points]) || undefined}
      {...rest}
    />
  )
}
