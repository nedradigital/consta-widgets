import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { Status } from '../TechParamsChart'

import css from './index.css'

type Props = {
  addDimension?: string
  addState?: string
  addName?: string
  addValue?: number
  className?: string
  dimension?: string
  name?: string
  state: string
  status?: Status
  value?: number | string
  minTwoLinesName?: boolean
}

const getCorrectValue = (value?: string | number) => {
  if (isNil(value)) {
    return '--'
  }

  if (typeof value === 'string') {
    return value
  }

  return value % 1 === 0 ? value : value.toFixed(1)
}

export const TechParamsBlock: React.FC<Props> = ({
  addDimension,
  addState,
  addName,
  addValue,
  className,
  dimension,
  name,
  state,
  status,
  value,
  minTwoLinesName,
}) => {
  return (
    <div
      className={classnames(
        css.techParamsBlock,
        status &&
          {
            'possible-warning': css.statusPossibleWarning,
            warning: css.statusWarning,
            'warning-possible-danger': css.statusWarningPossibleDanger,
            'possible-danger': css.statusDanger,
            danger: css.statusDanger,
            normal: '',
          }[status],
        className
      )}
    >
      <div className={css.cells}>
        <div className={css.cell}>
          <div className={css.state}>{state}</div>
          <div className={css.valueLine}>
            <span className={css.value}>{getCorrectValue(value)}</span>
            <span className={css.dimension}>{isNil(value) ? '' : dimension}</span>
          </div>
          <div className={classnames(css.name, minTwoLinesName && css.minTwoLines)}>{name}</div>
        </div>

        {(addDimension || addState || addName || addValue) && (
          <div className={classnames(css.cell, css.cellAdditional)}>
            <div className={css.state}>{addState}</div>
            <div className={css.valueLine}>
              <span className={css.value}>{getCorrectValue(addValue)}</span>
              <span className={css.dimension}>{isNil(addValue) ? '' : addDimension}</span>
            </div>
            <div className={classnames(css.name, minTwoLinesName && css.minTwoLines)}>
              {addName}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
