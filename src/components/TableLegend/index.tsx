import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { Title } from '@/ui/Title'

import css from './index.css'

type Values = Array<string | number | null>

type Props = {
  columnNames: string[]
  valueNames: string[]
  data: Array<{
    color: string
    name: string
    columns: Values[]
  }>
}

const valueColors = [undefined, '#0FC75D']

export const TableLegend: React.FC<Props> = ({ data, columnNames, valueNames }) => {
  return (
    <div>
      <table className={css.table}>
        <thead>
          {columnNames.map((name, idx) =>
            idx === 0 ? (
              <th key={idx}>
                <Title className={css.title}>{name}</Title>
              </th>
            ) : (
              <th key={idx} colSpan={valueNames.length} className={css.isPadded}>
                {name}
              </th>
            )
          )}
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.name}>
              <td>
                <span className={css.circle} style={{ backgroundColor: d.color }} />
                {d.name}
              </td>
              {d.columns.map(column =>
                column.map((value, idx) => (
                  <td
                    className={classnames(css.value, idx === 0 && css.isPadded)}
                    style={{
                      color: valueColors[idx],
                    }}
                    key={idx}
                  >
                    {isNil(value) ? '–' : value}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.values}>
        {valueNames.map((name, idx) => (
          <span
            key={name}
            className={css.valueName}
            style={{
              color: valueColors[idx],
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
