import React from 'react'

import classnames from 'classnames'

import { LabelPosition, LabelType, LegendItem, Size } from '@/core/LegendItem'

import css from './index.css'

export const directions = ['column', 'row'] as const
export type Direction = typeof directions[number]

export type Data = ReadonlyArray<{
  text: string
  color: string
}>

type Props = {
  data: Data
  direction: Direction
  labelType: LabelType
  fontSize: Size
  labelPosition: LabelPosition
  lineBold?: boolean
}

export const Legend: React.FC<Props> = ({
  direction,
  data,
  labelType,
  labelPosition,
  lineBold,
  fontSize,
}) => {
  return (
    <div className={classnames(css.main, css[direction])}>
      {data.map(item => (
        <LegendItem
          color={item.color}
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
