import React from 'react'

import { Badge, Status } from '@/components/Badge'
import { Title } from '@/components/Title'

import css from './index.css'

type Data = {
  percent: number
  value: number
  status?: Status
}

type ItemProps = {
  title: string
  unit: string
} & Data

type Props = {
  data: {
    cost: Data
    incidents: Data
    deadlines: Data
    time: Data
  }
}

const columnSettings = {
  cost: {
    title: 'Стоимость',
    unit: 'млн,₽',
  },
  incidents: {
    title: 'НПВ: Инциденты',
    unit: 'часы',
  },
  deadlines: {
    title: 'Сроки',
    unit: 'суток',
  },
  time: {
    title: 'Удельное время',
    unit: 'суток / 1000м\nсредневзвешенное',
  },
}

const columns = ['cost', 'incidents', 'deadlines', 'time'] as const

const Item: React.FC<ItemProps> = ({ status, value, percent, title, unit }) => (
  <div className={css.item}>
    <div className={css.title}>{title}</div>
    <div>
      <span className={css.value}>{value}</span>
      <Badge className={css.badge} status={status}>
        {percent}%
      </Badge>
    </div>
    <div className={css.unit}>{unit}</div>
  </div>
)

export const AccumulatedTotal: React.FC<Props> = ({ data }) => (
  <div>
    <Title>Накопленный итог</Title>
    <div className={css.group}>
      {columns.map(col => (
        <Item key={col} {...columnSettings[col]} {...data[col]} />
      ))}
    </div>
  </div>
)
