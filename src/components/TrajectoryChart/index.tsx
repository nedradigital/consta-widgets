import React, { createRef, useLayoutEffect, useState } from 'react'

import classnames from 'classnames'

import css from './index.css'

export const statuses = ['success', 'warning', 'danger'] as const

export type Props = {
  className?: string
  status?: typeof statuses[number]
}

const visualWarningZone = 0.375
const visualDangerZone = 0.64

const x = 0.5
const y = 0.5
const padding = 7

export const TrajectoryChart: React.FC<Props> = ({ className, status }) => {
  const [width, changeWidth] = useState(118)
  const ref = createRef<SVGSVGElement>()
  const effectiveWidth = width - padding * 2
  const isSuccess = status === 'success'
  const isWarning = status === 'warning'
  const isDanger = status === 'danger'

  const warningLinePositive = (0.5 + visualWarningZone / 2) * effectiveWidth + padding
  const dangerLinePositive = (0.5 + (visualDangerZone + 1) / 4) * effectiveWidth + padding
  const warningLineNegative = (0.5 - visualWarningZone / 2) * effectiveWidth + padding
  const dangerLineNegative = (0.5 - (visualDangerZone + 1) / 4) * effectiveWidth + padding

  const warningCircleRadius = (visualWarningZone / 2) * effectiveWidth
  const dangerCircleRadius = (visualDangerZone / 2) * effectiveWidth

  useLayoutEffect(() => {
    if (ref.current) {
      changeWidth(ref.current.getBoundingClientRect().width)
    }
  })

  return (
    <svg
      className={classnames(css.trajectoryСhart, status && css[status], className)}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={css.circle} cx="50%" cy="50%" r={effectiveWidth * 0.5} />
      <circle className={css.circle} cx="50%" cy="50%" r={warningCircleRadius} />
      <circle className={css.circle} cx="50%" cy="50%" r={dangerCircleRadius} />
      <circle className={css.center} cx="50%" cy="50%" r={effectiveWidth * 0.01} />
      <line
        className={css.line}
        x1={warningLineNegative}
        y1="50%"
        x2={dangerLineNegative}
        y2="50%"
      />
      <line
        className={css.line}
        x1={warningLinePositive}
        y1="50%"
        x2={dangerLinePositive}
        y2="50%"
      />
      <line
        className={css.line}
        x1="50%"
        y1={warningLineNegative}
        x2="50%"
        y2={dangerLineNegative}
      />
      <line
        className={css.line}
        x1="50%"
        y1={warningLinePositive}
        x2="50%"
        y2={dangerLinePositive}
      />
      {isSuccess && (
        <circle
          className={classnames(css.circle, css.isFill, css.success)}
          cx="50%"
          cy="50%"
          r={warningCircleRadius}
        />
      )}
      {(isSuccess || isWarning) && (
        <circle
          className={classnames(css.circle, css.isStroke, css.success)}
          cx="50%"
          cy="50%"
          r={warningCircleRadius}
        />
      )}
      {isWarning && (
        <circle
          className={classnames(css.circle, css.isFill, css.warning)}
          cx="50%"
          cy="50%"
          r={((visualDangerZone + visualWarningZone) / 4) * effectiveWidth}
          style={{ strokeWidth: ((visualDangerZone - visualWarningZone) / 2) * effectiveWidth }}
        />
      )}
      {(isWarning || isDanger) && (
        <circle
          className={classnames(css.circle, css.isStroke, css.warning)}
          cx="50%"
          cy="50%"
          r={dangerCircleRadius}
        />
      )}
      {isDanger && (
        <circle
          className={classnames(css.circle, css.isFill, css.danger)}
          cx="50%"
          cy="50%"
          r={((visualDangerZone + 1) / 4) * effectiveWidth}
          style={{ strokeWidth: ((1 - visualDangerZone) / 2) * effectiveWidth }}
        />
      )}
      {isDanger && (
        <circle
          className={classnames(css.circle, css.isStroke, css.danger)}
          cx="50%"
          cy="50%"
          r={0.5 * effectiveWidth}
        />
      )}
      <circle
        className={css.circleCurrent}
        cx={x * effectiveWidth + padding}
        cy={y * effectiveWidth + padding}
        r={padding}
      />
    </svg>
  )
}
