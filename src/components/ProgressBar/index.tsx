import React from 'react'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Legend, Tick } from '@/components/ProgressBar/components/Legend'
import { ColorGroups } from '@/types'
import { TextSize } from '@/utils/ui-kit'

import { Data as ProgressData, Progress } from './components/Progress'
import css from './index.css'

export type Data = ProgressData & {
  ticks?: readonly Tick[]
  summary: string | number
  colorGroupName: string
  caption?: string
  tooltip?: React.ReactNode
}

export type Size = 's' | 'm' | 'l'

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

export const ProgressBar: React.FC<Props> = ({ size = 'm', data, colorGroups }) => {
  return (
    <div className={css.progressBar}>
      {data.map((dataItem, i) => {
        const { caption, colorGroupName, value, summary, ticks = [], valueMin, valueMax } = dataItem
        const color = colorGroups[colorGroupName]

        return (
          <div className={css.item} key={i}>
            {caption && (
              <div className={css.row}>
                <div className={classnames(css.cell, css.isTitleCell)}>
                  {/* Подумать как быть с текстовым виджетом в компонентах */}
                  {/* {caption && (
                    <TextWidget
                      data={{ text: caption, tooltip }}
                      params={{
                        text: caption,
                        croppedLineCount: 1,
                        type: isCaptionBold ? 'text3' : 'text2',
                      }}
                    />
                  )} */}
                </div>
              </div>
            )}

            <div className={css.row}>
              <div className={classnames(css.cell, css.isProgressCell)}>
                <Progress data={dataItem} color={color} size={size} />
              </div>
              <div className={classnames(css.cell, css.isValueCell)} style={{ color }}>
                <Text tag="div" size={summarySizes[size]}>
                  {isNotNil(value) ? summary : '–'}
                </Text>
              </div>
            </div>

            {ticks.length ? (
              <div className={css.row}>
                <div className={classnames(css.cell, css.isTicksCell)}>
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
