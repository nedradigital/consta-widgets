import React from 'react'

import { GridLines } from '@/components/GridLines'
import { HorizontalTicks } from '@/components/HorizontalTicks'
import { LinearChart } from '@/components/LinearChart'
import { VerticalTicks } from '@/components/VerticalTicks'
import { Title } from '@/ui/Title'

type Props = {
  data: number[]
  title: string
  unitName: string
  legendName: string
}

const xLabels = ['янв', '', '', 'апр', '', '', 'июл', '', '', 'окт', '', '', '']

export const CostGraph: React.FC<Props> = ({ data, title, unitName, legendName }) => {
  return (
    <div>
      <Title>{title}</Title>
      <LinearChart
        lines={[
          {
            values: data,
            circle: true,
            hint: true,
            colors: {
              line: '#29b0ff',
            },
          },
        ]}
        valuePadding={[0.1, 0.1]}
        unitName={unitName}
        legend={[
          {
            name: legendName,
          },
        ]}
        renderHorizontalScale={() => <HorizontalTicks labels={xLabels} />}
        renderVerticalScale={({ minValue, maxValue }) => (
          <VerticalTicks minValue={minValue} maxValue={maxValue} ticks={4} />
        )}
        renderGridLines={() => <GridLines columns={12} />}
      />
    </div>
  )
}
