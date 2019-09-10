import React from 'react'

import classnames from 'classnames'

import { ReactComponent as IconFb } from './images/i-fb.svg'
import { ReactComponent as IconLength } from './images/i-length.svg'
import { ReactComponent as IconMGRP } from './images/i-mgrp.svg'
import { ReactComponent as IconTechnology } from './images/i-technology.svg'
import css from './index.css'

type Props = {
  className?: string
  icon?: 'technology' | 'fb' | 'length' | 'mgrp'
  isNew?: boolean
  title?: string
  description?: string
}

const iconsMap = {
  fb: IconFb,
  length: IconLength,
  mgrp: IconMGRP,
  technology: IconTechnology,
}

export const TechnologyInfo: React.FC<Props> = ({ className, icon, isNew, title, description }) => {
  const Icon = icon && iconsMap[icon]

  return (
    <div className={classnames(css.main, className)}>
      {Icon && (
        <div className={css.icon}>
          <Icon />
          {isNew && <span className={css.newLabel}>NEW</span>}
        </div>
      )}
      {title && <div className={css.title}>{title}</div>}
      {description && <div className={css.description}>{description}</div>}
    </div>
  )
}
