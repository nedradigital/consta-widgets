import * as React from 'react'

import classnames from 'classnames'
import isNil from 'lodash/isNil'

import css from './index.css'

type responsiblePersonType = {
  name?: string
  phone?: string
}

type WellPassportProps = {
  /** Буровой подрядчик */
  drillCompany: string
  /** Название месторождения */
  oilFieldName: string
  /** Плановый забой */
  planDepth: string
  /** Id скважины */
  wellId: string
  /** Номер куста скважины */
  wellPad: string
  className?: string
  onClick?: () => void
  geoParams?: string[]
  techParams?: string[]
  responsiblePersons?: {
    [key: string]: responsiblePersonType
  }
  wellsNavigation?: React.ReactNode
}

const professionMap: { [index: string]: string } = {
  technologist: 'Технолог',
  geologist: 'Геолог',
  geonavigator: 'Геонавигатор',
}

const professionTypes = ['technologist', 'geologist', 'geonavigator']

export const WellPassport: React.FC<WellPassportProps> = ({
  className,
  drillCompany,
  oilFieldName,
  onClick,
  planDepth,
  wellId,
  wellPad,
  geoParams,
  techParams,
  responsiblePersons,
}) => (
  <div
    className={classnames(
      css.main,
      {
        [css.isHoverable]: onClick,
      },
      className
    )}
    onClick={onClick}
  >
    <div className={css.cells}>
      <div className={css.cell}>
        <div className={css.title}>Скважина</div>
        <div className={classnames(css.content, css.contentStrong)}>
          {isNil(wellId) ? '--' : wellId}
        </div>
      </div>
      <div className={css.cell}>
        <div className={css.title}>Куст</div>
        <div className={classnames(css.content, css.contentStrong)}>
          {isNil(wellPad) ? '--' : wellPad}
        </div>
      </div>
      <div className={css.cell}>
        <div className={css.title}>{isNil(drillCompany) ? 'Название ДО: --' : drillCompany}</div>
        <div title={oilFieldName} className={classnames(css.content, css.contentStrong)}>
          {isNil(oilFieldName) ? 'Месторож-е: --' : oilFieldName}
        </div>
      </div>
      <div className={css.cell}>
        <div className={css.title}>Забой план</div>
        <div className={classnames(css.content, css.contentStrong)}>
          {isNil(planDepth) ? '--' : planDepth}
        </div>
      </div>
      {((geoParams && Boolean(geoParams.length)) || (techParams && Boolean(techParams.length))) && (
        <div className={css.cell}>
          <div className={css.title}>
            {techParams &&
              Boolean(techParams.length) &&
              techParams.map(param => <span key={param}>{param}</span>)}
          </div>
          <div className={classnames(css.content, css.contentStrong)}>
            {geoParams &&
              Boolean(geoParams.length) &&
              geoParams.map(param => (
                <span className={css.textItem} key={param}>
                  {param}
                </span>
              ))}
          </div>
        </div>
      )}
      {responsiblePersons && (
        <div className={css.cell}>
          <div className={css.title}>Ответственные по скважине</div>
          <div className={css.content}>
            <div
              className={classnames(css.responsiblePerson, {
                [classnames(css.responsiblePerson, css.hasPhones)]: Object.values(
                  responsiblePersons
                ).some(person => person && person.phone),
              })}
            >
              {professionTypes.map(profession => {
                const { name, phone } = responsiblePersons[profession]
                return (
                  <div className={css.responsiblePerson} key={profession}>
                    <div className={css.responsiblePersonName}>
                      {isNil(name)
                        ? profession === professionTypes[0]
                          ? `${professionMap[profession]}: --`
                          : ``
                        : name}
                    </div>
                    <div className={css.responsiblePersonPhone}>{phone}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)
