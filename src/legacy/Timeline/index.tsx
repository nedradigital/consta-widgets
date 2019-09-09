import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import css from './index.css'

type Time = string
type Depth = number

type Props = {
  className?: string
  data?: Array<[Time?, Depth?]>
  styles?: React.CSSProperties
}

export const Timeline: React.FC<Props> = ({ className, data = [], styles = {} }) => (
  <div className={classnames(css.timeline, className)} style={styles}>
    {data.map((item, index) => {
      const [time, depth] = item
      const depthRounded = !isNil(depth) ? Math.round(depth) : null

      return (
        <div key={index} className={css.item}>
          <div className={css.time}>{time || '--'}</div>
          <div className={css.value}>{depthRounded || '--'}</div>
        </div>
      )
    })}
  </div>
)
