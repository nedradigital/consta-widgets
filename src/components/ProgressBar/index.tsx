import React from 'react'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'
import { TextWidgetContent as TextWidget } from '@/widgets/TextWidget'

import { Data as ProgressData, Progress } from './components/Progress'
import { Summary } from './components/Summary'
import css from './index.css'

export const sizes = ['s', 'm', 'l'] as const
export type Size = typeof sizes[number]

export type Data = ProgressData & {
  summary: string | number
  colorGroupName: string
  caption?: string
  tooltip?: React.ReactNode
}

type Props = {
  size?: Size
  colorGroups: ColorGroups
  data: readonly Data[]
  isCaptionBold?: boolean
}

export const getValueRatio = ({
  value,
  valueMin,
  valueMax,
}: {
  value: number
  valueMin: number
  valueMax: number
}) => {
  return ((value - valueMin) / (valueMax - valueMin)) * 100
}

export const ProgressBar: React.FC<Props> = ({ size = 'm', data, colorGroups, isCaptionBold }) => {
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]

  return (
    <div className={classnames(css.progressBar, sizeClass)}>
      {data.map((dataItem, i) => {
        const { caption, colorGroupName, tooltip, value, summary } = dataItem

        return (
          <React.Fragment key={i}>
            <div className={css.cell}>
              {caption && (
                <div className={css.caption}>
                  <TextWidget
                    data={{ text: caption, tooltip }}
                    params={{
                      text: caption,
                      croppedLineCount: 1,
                      type: isCaptionBold ? 'text3' : 'text2',
                    }}
                  />
                </div>
              )}
              <Progress data={dataItem} color={colorGroups[colorGroupName]} />
            </div>
            <div className={classnames(css.cell, css.textCell)}>
              <Summary
                summary={isNotNil(value) ? summary : '–'}
                color={colorGroups[colorGroupName]}
                hasCaption={!!caption}
              />
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
