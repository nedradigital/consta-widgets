import React from 'react'

import classnames from 'classnames'

import { LegendItem } from '@/components/LegendItem'
import { ColorGroups } from '@/dashboard'
import { LegendParams } from '@/dashboard/widget-params'

import css from './index.css'

export type Data = ReadonlyArray<{
  text: string
  colorGroupName: string
}>

type Props = {
  colorGroups: ColorGroups
  data: Data
} & LegendParams

export const Legend: React.FC<Props> = ({
  direction,
  data,
  labelType,
  labelPosition,
  lineBold,
  fontSize,
  colorGroups,
}) => {
  return (
    <div className={classnames(css.main, css[direction])}>
      {data.map(item => (
        <LegendItem
          color={colorGroups[item.colorGroupName]}
          key={item.text}
          className={css.item}
          fontSize={fontSize}
          type={labelType}
          position={labelPosition}
          lineBold={lineBold}
          shouldCropText
        >
          {item.text}
        </LegendItem>
      ))}
    </div>
  )
}
