import * as React from 'react'

import classnames from 'classnames'
import isNil from 'lodash/isNil'

import { flags } from './constants'
import css from './index.css'

type Props = {
  className?: string
  /** DDI (Drilling Difficulty Index) Коэффициент сложности скважины */
  ddi?: number
  /** ERD (Extended Reach Drilling) Отход от вертикали */
  erd?: number
  /** Назначение скважины [enum] */
  objective?: 'OPERATIONAL' | 'ZBS ' | 'ESTIMATED ' | 'EXPLORATION'
  /** Назначение скважины */
  objectiveName?: string
  /** Назначение скважины (кратко) */
  objectiveShortName?: string
  /** TAML (Technology Advancement for Multi-Laterals) Классификация по TAML */
  taml?: number
  /** Тип конструкции */
  wellType?: 'VS' | 'NNS' | 'GS' | 'MZS' | 'BGS'
  /** Тип конструкции */
  wellTypeName?: string
  /** Тип конструкции (кратко) */
  wellTypeShortName?: string
  country?: string

  countryName?: string
}

export const WellProfileType: React.FC<Props> = ({
  className,
  erd,
  ddi,
  objectiveShortName,
  taml,
  wellTypeName,
  country,
  countryName,
}) => {
  const flag = !isNil(country) && typeof flags[country] !== 'undefined' ? flags[country] : ''

  return (
    <div className={classnames(css.main, className)}>
      <div className={css.infoLine}>
        <div className={css.countryWrap}>
          {!isNil(country) && typeof flags[country] !== 'undefined' && (
            <span className={css.countryFlag}>
              <img src={flag} />
            </span>
          )}
          {!isNil(country) && !isNil(countryName) && country !== 'RU' && <span>{countryName}</span>}
        </div>
        {!isNil(objectiveShortName) && <div>{objectiveShortName}</div>}
      </div>
      <div className={css.title}>
        {isNil(wellTypeName)
          ? 'Тип профиля скважины'
          : `${wellTypeName}${isNil(taml) ? '' : ` TAML-${taml}`}`}
      </div>
      <div>
        {!isNil(erd) && erd >= 2 && <React.Fragment>Большой отход от вертикали</React.Fragment>}
        <React.Fragment> DDI {ddi}</React.Fragment>
      </div>
    </div>
  )
}
