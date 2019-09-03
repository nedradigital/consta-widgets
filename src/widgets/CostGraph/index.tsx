import React from 'react'

import { range } from 'lodash'

import { Chart } from '@/components/Chart'
import { Title } from '@/components/Title'

type Props = {
  data: number[]
  title: string
  unitName: string
  legendName: string
}

const x = ['янв', '', '', 'апр', '', '', 'июл', '', '', 'окт', '', '']

export const CostGraph: React.FC<Props> = ({ data, title, unitName, legendName }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const maxValue = max + Math.ceil(max * 0.1)
  const minValue = min - Math.ceil(min * 0.1)
  const y = range(minValue, maxValue, (maxValue - minValue) / 4).reverse()

  return (
    <div>
      <Title>{title}</Title>
      <Chart
        labels={{ x, y }}
        minValue={minValue}
        maxValue={maxValue}
        lines={[
          {
            value: data,
            circle: true,
            hint: true,
            colors: {
              line: '#29b0ff',
            },
          },
        ]}
        unitName={unitName}
        legend={[
          {
            name: legendName,
          },
        ]}
      />
    </div>
  )
}
