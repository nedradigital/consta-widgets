import React from 'react'

import classnames from 'classnames'

import { ReactComponent as IconLandDrillingRig } from './images/land-drilling-rig-bu.svg'
import { ReactComponent as IconRUO } from './images/ruo.svg'
import { ReactComponent as IconRUS } from './images/rus.svg'
import { ReactComponent as IconRVO } from './images/rvo.svg'
import { ReactComponent as IconVZD } from './images/vzd.svg'
import css from './index.css'

export const drillingIcons = ['VZD', 'RUS'] as const
type DrillingIcon = typeof drillingIcons[number]

export const mudIcons = ['RUO', 'RVO'] as const
type MudIcon = typeof mudIcons[number]

type Props = {
  className?: string

  /** Тип буровой установки */
  drillRig?: string

  /** Иконка типа воздействия на забой */
  drillingIcon?: DrillingIcon

  /** Тип воздействия на забой */
  drillingShortName?: string

  /** Иконка типа раствора */
  mudIcon?: MudIcon

  /** Тип раствора */
  mudShortName?: string
}

const iconsMap = {
  RUO: <IconRUO />,
  RVO: <IconRVO />,
  RUS: <IconRUS />,
  VZD: <IconVZD />,
}

export const TechnologicalCharacteristics: React.FC<Props> = ({
  className,
  drillRig = 'Тип буровой установки',
  drillingIcon,
  drillingShortName = 'Тип воздействия на забой',
  mudIcon,
  mudShortName = 'Тип бурового раствора',
}) => (
  <div className={classnames(css.main, className)}>
    <div className={css.item}>
      <div className={css.icon}>
        <IconLandDrillingRig />
      </div>
      <div className={css.text}>{drillRig}</div>
    </div>
    <div className={css.item}>
      <div className={css.icon}>{mudIcon && iconsMap[mudIcon]}</div>
      <div className={css.text}>{mudShortName}</div>
    </div>
    <div className={css.item}>
      <div className={css.icon}>{drillingIcon && iconsMap[drillingIcon]}</div>
      <div className={css.text}>{drillingShortName}</div>
    </div>
  </div>
)
