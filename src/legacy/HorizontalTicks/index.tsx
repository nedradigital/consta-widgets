import React from 'react'

import * as _ from 'lodash'

import css from './index.css'

type Props = { marginTop?: number } & (
  | {
      labels: readonly string[]
    }
  | {
      columns: number
      renderLabel: (idx: number) => React.ReactNode
    })

export const HorizontalTicks: React.FC<Props> = (props: Props) => {
  const labels =
    'labels' in props
      ? props.labels
      : (_.times(props.columns, props.renderLabel) as readonly React.ReactNode[])

  return (
    <div className={css.main} style={{ marginTop: props.marginTop }}>
      {labels.map((label, index) => (
        <div key={index} className={css.label}>
          <div className={css.name}>{label}</div>
        </div>
      ))}
    </div>
  )
}
