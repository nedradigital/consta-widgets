import classnames from 'classnames'

import { getSize } from './helpers'
import css from './index.css'

type Props = {
  color: string
  length: number
  isHorizontal: boolean
  isReversed: boolean
  isRounded: boolean
}

export const Section: React.FC<Props> = ({
  color,
  length,
  isHorizontal,
  isReversed,
  isRounded,
}) => (
  <div
    className={classnames(
      css.section,
      isHorizontal && css.isHorizontal,
      isReversed && css.isReversed,
      isRounded && css.isRounded
    )}
    style={{
      ...getSize(length, isHorizontal),
      backgroundColor: color,
    }}
  />
)
