import React from 'react'

import { Badge } from '@/ui/Badge'
import { Title } from '@/ui/Title'

import css from './index.css'

type Data = {
  text: string
  label: string
}

type Props = {
  data: Data[]
}

const Item: React.FC<Data> = ({ text, label }) => (
  <div className={css.item}>
    <div className={css.text}>{text}</div>
    <Badge className={css.label}>{label}</Badge>
  </div>
)

export const TechnologicalInnovation: React.FC<Props> = ({ data }) => (
  <div>
    <Title>Технологические инновации</Title>
    <div className={css.group}>
      {data.map(item => (
        <Item key={item.text} {...item} />
      ))}
    </div>
  </div>
)
