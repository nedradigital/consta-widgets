import React from 'react'

import classnames from 'classnames'

import { LegendItem, Position, Size, Type } from '@/components/LegendItem'

import css from './index.css'

export const directions = ['column', 'row'] as const
export type Direction = typeof directions[number]

export type DataItem = {
  color: string
  text: string
}

type Props = {
  direction: Direction
  labelType: Type
  fontSize: Size
  labelPosition: Position
  lineBold?: boolean
  data: readonly DataItem[]
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
          {...item}
          key={item.text}
          className={css.item}
          fontSize={fontSize}
          type={labelType}
          position={labelPosition}
          lineBold={lineBold}
        />
      ))}
    </div>
  )
}
