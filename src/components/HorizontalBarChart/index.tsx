import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  data: readonly LineProps[]
  className?: string
}

export type LineProps = {
  title: string
  percent: number
  value: number
}

const Line: React.FC<LineProps> = ({ title, percent, value }) => {
  return (
    <tr className={css.line}>
      <td className={css.title}>{title}</td>
      <td className={css.progressWrapper}>
        <div className={css.progress} style={{ width: `${percent}%` }} />
      </td>
      <td className={css.value}>{value}</td>
    </tr>
  )
}

export const HorizontalBarChart: React.FC<Props> = ({ data, className }) => (
  <table className={classnames(css.diagram, className)}>
    {data.map(item => (
      <Line key={item.title} {...item} />
    ))}
  </table>
)
