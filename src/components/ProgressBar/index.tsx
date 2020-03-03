import React from 'react'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Legend, Tick } from '@/components/ProgressBar/components/Legend'
import { ColorGroups } from '@/dashboard/types'
import { TextSize } from '@/utils/ui-kit'
import { TextWidgetContent as TextWidget } from '@/widgets/TextWidget'

import { Data as ProgressData, Progress } from './components/Progress'
import css from './index.css'

export const sizes = ['s', 'm', 'l'] as const
export type Size = typeof sizes[number]

export type Data = ProgressData & {
  ticks?: readonly Tick[]
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

const summarySizes: Record<Size, TextSize> = {
  s: 'l',
  m: '2xl',
  l: '2xl',
}

export const ProgressBar: React.FC<Props> = ({ size = 'm', data, colorGroups, isCaptionBold }) => {
  return (
    <div className={css.progressBar}>
      {data.map((dataItem, i) => {
        const {
          caption,
          colorGroupName,
          tooltip,
          value,
          summary,
          ticks = [],
          valueMin,
          valueMax,
        } = dataItem
        const color = colorGroups[colorGroupName]

        return (
          <div className={css.item} key={i}>
            {caption && (
              <div className={css.row}>
                <div className={classnames(css.cell, css.isTitleCell)}>
                  {caption && (
                    <TextWidget
                      data={{ text: caption, tooltip }}
                      params={{
                        text: caption,
                        croppedLineCount: 1,
                        type: isCaptionBold ? 'text3' : 'text2',
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            <div className={css.row}>
              <div className={css.cell}>
                <Progress data={dataItem} color={color} size={size} />
              </div>
              <div className={css.cell} style={{ color }}>
                <Text tag="div" size={summarySizes[size]}>
                  {isNotNil(value) ? summary : '–'}
                </Text>
              </div>
            </div>

            {/* 3 строка */}
            {ticks.length ? (
              <div className={css.row}>
                <div className={css.cell}>
                  <Legend ticks={ticks} valueMin={valueMin} valueMax={valueMax} />
                </div>
                <div className={css.cell} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
