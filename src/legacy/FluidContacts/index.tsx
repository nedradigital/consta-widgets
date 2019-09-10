import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import css from './index.css'

type Props = {
  className?: string

  /** Тип коллектора */
  collectorTypeName?: string

  /** Флюидальные контакты (ГНК) */
  gnk?: number

  /** ТРИЗ */
  htr?: boolean

  /** Мощность (малая) целевого интервала */
  targetIntervalPower?: number

  /** Глубина продуктивного пласта */
  vdTop?: number

  /** Флюидальные контакты (ВНК) */
  vnk?: number

  /** Тип пустотного пространства */
  voidTypeName?: string
}

export const FluidContacts: React.FC<Props> = ({
  className,
  collectorTypeName,
  voidTypeName,
  htr,
  gnk,
  vnk,
  targetIntervalPower,
  vdTop,
}) => (
  <div className={classnames(css.fluidContacts, className)}>
    <div className={css.item}>
      <div className={css.title}>
        {isNil(collectorTypeName) && isNil(voidTypeName) && (isNil(htr) || htr === false)
          ? 'Тип коллектора: --'
          : `${[collectorTypeName, voidTypeName, htr ? 'ТРИЗ' : null]
              .filter(e => !isNil(e))
              .join(', ')} коллектор`}
      </div>
    </div>
    {!isNil(gnk) && (
      <div className={css.item}>
        <div className={css.value}>
          <div className={classnames(css.gnk, css.typeGas)} />
          <div className={css.name}>Газ</div>
        </div>
        <div className={css.depth}>{gnk} а.о.</div>
      </div>
    )}
    {(!isNil(targetIntervalPower) || !isNil(vdTop)) && (
      <div className={css.item}>
        <div className={css.value}>
          <div className={classnames(css.gnk, css.typeOil)} />
          <div className={css.name}>Нефть, целевой интервал</div>
          <div className={css.targetInterval}>
            {!isNil(targetIntervalPower) && (
              <React.Fragment>
                <span className={css.tiValue}>{targetIntervalPower}</span>{' '}
                <span className={css.tiUnits}>м</span>
                {!isNil(vdTop) && ', '}
              </React.Fragment>
            )}
            {!isNil(vdTop) && (
              <React.Fragment>
                <span className={css.tiValue}>{vdTop}</span>{' '}
                <span className={css.tiUnits}>а.о.</span>
              </React.Fragment>
            )}
          </div>
        </div>
        {!isNil(vnk) && <div className={css.depth}>{vnk} а.о.</div>}
      </div>
    )}
    {!isNil(vnk) && (
      <div className={css.item}>
        <div className={css.value}>
          <div className={classnames(css.gnk, css.typeWater)} />
          <div className={css.name}>Вода</div>
        </div>
      </div>
    )}
  </div>
)
