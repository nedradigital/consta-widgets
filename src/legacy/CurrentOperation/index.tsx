import React from 'react'

import { ElementWithIcon } from '@/legacy/ElementWithIcon'
import { Switcher } from '@/legacy/Switcher'
import { Timer } from '@/legacy/Timer'

import { ReactComponent as IconFb } from './images/i-fb.svg'
import { ReactComponent as IconTime } from './images/i-time.svg'
import css from './index.css'

type Props = {
  title: React.ReactNode
  actualTime?: number
  duration?: string
  fb?: string
  isAdaptive?: boolean
  toggleAdaptive?: () => void
}

export const CurrentOperation: React.FC<Props> = React.memo(
  ({ actualTime, duration, fb, title, isAdaptive, toggleAdaptive }) => (
    <div className={css.currentOoperation}>
      <div className={css.infoLine}>
        {actualTime && (
          <div className={css.element}>
            <ElementWithIcon icon={<IconTime />}>
              <Timer startTime={actualTime} />
            </ElementWithIcon>
          </div>
        )}

        {duration && (
          <div className={css.element}>
            <ElementWithIcon icon={<IconTime />}>{duration}</ElementWithIcon>
          </div>
        )}

        {fb && (
          <div className={css.element}>
            <ElementWithIcon icon={<IconFb />}>{fb}</ElementWithIcon>
          </div>
        )}

        {toggleAdaptive && (
          <div className={css.switcher}>
            <Switcher isEnabled={Boolean(isAdaptive)} onClick={toggleAdaptive} />
          </div>
        )}
      </div>

      <div className={css.title}>{title}</div>
    </div>
  )
)
