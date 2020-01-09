import React from 'react'

import classnames from 'classnames'

import { LegendItem, Position, Size, Type } from '@/components/LegendItem'
import { ColorGroups } from '@/dashboard/types'

import css from './index.css'

export const directions = ['column', 'row'] as const
export type Direction = typeof directions[number]

export type Data = ReadonlyArray<{
  text: string
  colorGroupName: string
}>

type Props = {
  colorGroups: ColorGroups
  direction: Direction
  labelType: Type
  fontSize: Size
  labelPosition: Position
  lineBold?: boolean
  data: Data
}

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
