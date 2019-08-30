import React from 'react'

import css from './index.css'

type Props = {
  data: LineProps[]
}

type LineProps = {
  title: string
  percent: number
  value: number
}

const Line: React.FC<LineProps> = ({ title, percent, value }) => {
  return (
    <div className={css.line}>
      <div className={css.title}>{title}</div>
      <div className={css.progressWrapper}>
        <div className={css.progress} style={{ width: `${percent}%` }} />
      </div>
      <div className={css.value}>{value}</div>
    </div>
  )
}

export const HorizontalBarChart: React.FC<Props> = ({ data }) => (
  <div className={css.diagram}>
    {data.map(item => (
      <Line key={item.title} {...item} />
    ))}
  </div>
)
