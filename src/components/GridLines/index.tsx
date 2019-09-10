import React from 'react'

import { times } from 'lodash'

import css from './index.css'

export const GridLines: React.FC<{ columns?: number; rows?: number }> = ({ columns, rows }) => (
  <div className={css.main}>
    {columns ? (
      <div className={css.columns}>
        {times(columns, idx => (
          <div key={idx} className={css.column} />
        ))}
      </div>
    ) : null}
    {rows ? (
      <div className={css.rows}>
        {times(rows, idx => (
          <div key={idx} className={css.row} />
        ))}
      </div>
    ) : null}
  </div>
)
