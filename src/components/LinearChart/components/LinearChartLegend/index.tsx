import React from 'react'

import { Legend, Line } from '@/components/LinearChart'

import css from './index.css'

export const LinearChartLegend: React.FC<{ items: readonly Legend[]; lines: readonly Line[] }> = ({
  items,
  lines,
}) => (
  <div className={css.main}>
    {items.map((item, index) => (
      <div key={item.name} className={css.item}>
        <span
          className={css.marker}
          style={{
            background: lines[index] && lines[index].color,
          }}
        />
        {item.name}
        {item.value ? <span className={css.value}>{item.value}</span> : null}
      </div>
    ))}
  </div>
)
