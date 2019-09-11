import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { TechParamsBlock } from '../TechParamsBlock'
import { DataRange, Status, TechParamsChart } from '../TechParamsChart'

import css from './index.css'

type Props = {
  additionalData?: any
  className?: string
  mainData?: {
    unit?: string
    loLimit?: number
    loBound?: number
    hiBound?: number
    hiLimit?: number
    defaultLoBound?: number
    defaultHiBound?: number
    data: number[]
    description?: string
  }
  dataRange?: DataRange
  status?: Status
  state: string
}

export const TechParamsBlockWithChart: React.FC<Props> = ({
  className,
  mainData,
  additionalData,
  state,
  status,
}) => {
  if (!mainData) {
    return null
  }

  const loLimit = mainData.loLimit
  const loBound =
    !isNil(mainData.loLimit) && !isNil(mainData.loBound)
      ? Math.max(mainData.loLimit, mainData.loBound)
      : mainData.loBound
  const hiBound =
    !isNil(mainData.hiLimit) && !isNil(mainData.hiBound)
      ? Math.min(mainData.hiLimit, mainData.hiBound)
      : mainData.hiBound
  const hiLimit = mainData.hiLimit
  const data = mainData.data
  const defaultLoBound = mainData.defaultLoBound
  const defaultHiBound = mainData.defaultHiBound

  const preliminaryMinimum =
    !isNil(loLimit) && !isNil(defaultLoBound)
      ? Math.min(loLimit, defaultLoBound)
      : !isNil(defaultLoBound)
      ? defaultLoBound
      : !isNil(loLimit)
      ? loLimit
      : null

  const preliminaryMaximum =
    !isNil(hiLimit) && !isNil(defaultHiBound)
      ? Math.max(hiLimit, defaultHiBound)
      : !isNil(defaultHiBound)
      ? defaultHiBound
      : !isNil(hiLimit)
      ? hiLimit
      : null

  const dataRange = {
    minimum: !isNil(preliminaryMinimum)
      ? Math.min(preliminaryMinimum, Math.min(...data))
      : data.length
      ? Math.min(...data)
      : 0,
    lowerDanger: !isNil(loLimit) ? loLimit : data.length ? Math.min(...data) : 0,
    originalLowerDanger: !isNil(loLimit) ? loLimit : 0,
    lowerWarning: !isNil(loBound)
      ? loBound
      : !isNil(loLimit)
      ? loLimit
      : data.length
      ? Math.min(...data)
      : 0,
    originalLowerWarning: !isNil(loBound) ? loBound : 0,
    upperWarning: !isNil(hiBound)
      ? hiBound
      : !isNil(hiLimit)
      ? hiLimit
      : data.length
      ? Math.max(...data)
      : 0,
    originalUpperWarning: !isNil(hiBound) ? hiBound : 0,
    upperDanger: !isNil(hiLimit) ? hiLimit : data.length ? Math.max(...data) : 0,
    originalUpperDanger: !isNil(hiLimit) ? hiLimit : 0,
    maximum: !isNil(preliminaryMaximum)
      ? Math.max(preliminaryMaximum, Math.max(...data))
      : data.length
      ? Math.max(...data)
      : 0,
  }

  const value = data && data.length ? data[data.length - 1] : undefined
  const currentStatus =
    status ||
    (value === null || value === undefined
      ? 'normal'
      : loLimit !== null && loLimit !== undefined && value <= dataRange.lowerDanger
      ? 'danger'
      : loLimit !== null &&
        loLimit !== undefined &&
        value <=
          dataRange.lowerDanger + Math.abs(dataRange.lowerWarning - dataRange.lowerDanger) / 8
      ? 'warning-possible-danger'
      : loBound !== null && loBound !== undefined && value <= dataRange.lowerWarning
      ? 'warning'
      : loBound !== null &&
        loBound !== undefined &&
        value <=
          dataRange.lowerWarning + Math.abs(dataRange.upperWarning - dataRange.lowerWarning) / 8
      ? 'possible-warning'
      : hiLimit !== null && hiLimit !== undefined && value >= dataRange.upperDanger
      ? 'danger'
      : hiLimit !== null &&
        hiLimit !== undefined &&
        value >=
          dataRange.upperDanger - Math.abs(dataRange.upperDanger - dataRange.upperWarning) / 8
      ? 'warning-possible-danger'
      : hiBound !== null && hiBound !== undefined && value >= dataRange.upperWarning
      ? 'warning'
      : hiBound !== null &&
        hiBound !== undefined &&
        value >=
          dataRange.upperWarning - Math.abs(dataRange.upperWarning - dataRange.lowerWarning) / 8
      ? 'possible-warning'
      : 'normal')

  return (
    <div className={classnames(css.techParamsBlockWithChart, className)}>
      <div className={css.chart}>
        <TechParamsChart
          mainChartData={mainData.data}
          additionalChartData={additionalData && additionalData.data}
          additionalDataDefaultLoBound={additionalData && additionalData.defaultLoBound}
          additionalDataDefaultHiBound={additionalData && additionalData.defaultHiBound}
          dataRange={dataRange}
          status={currentStatus as Status}
        />
      </div>
      <div className={css.params}>
        <TechParamsBlock
          state={state}
          value={value}
          dimension={mainData.unit}
          name={mainData.description}
          addValue={
            additionalData &&
            additionalData.data &&
            additionalData.data[additionalData.data.length - 1]
          }
          addDimension={additionalData && additionalData.unit}
          addName={additionalData && additionalData.description}
          status={currentStatus as Status}
          minTwoLinesName={true}
        />
      </div>
    </div>
  )
}
