import React from 'react'

import classnames from 'classnames'

import { ReactComponent as IconAbnormalPressure } from './images/abnormalPressure.svg'
import { ReactComponent as IconCg } from './images/cg.svg'
import { ReactComponent as IconH2S } from './images/h2s.svg'
import { ReactComponent as IconPermafrost } from './images/permafrost.svg'
import css from './index.css'

export const icons = ['abnormalPressure', 'cg', 'h2s', 'permafrost'] as const

type Props = {
  className?: string
  icon: typeof icons[number]
  text?: string
  title?: string
}

const iconsMap = {
  abnormalPressure: IconAbnormalPressure,
  cg: IconCg,
  h2s: IconH2S,
  permafrost: IconPermafrost,
}

export const GeologicFeaturePlate: React.FC<Props> = ({ className, icon, text, title }) => {
  const IconComponent = icon && iconsMap[icon]

  return (
    <div className={classnames(css.geologicFeaturePlate, className)}>
      {IconComponent && (
        <div className={css.icon}>
          <IconComponent />
        </div>
      )}
      {title && <div className={css.title}>{title}</div>}
      {text && <div className={css.text}>{text}</div>}
    </div>
  )
}
