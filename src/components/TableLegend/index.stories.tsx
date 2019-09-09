import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { CHART_COLORS } from '@/components/PieChart'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { TableLegend } from '.'

storiesOf('components/TableLegend', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 400 }))
  .add('interactive', () => {
    return (
      <TableLegend
        columnNames={['Типы конструкций', 'Без МГРП', 'МГРП']}
        valueNames={['Сумма скважин', 'Эффективность проходки']}
        data={[
          {
            color: CHART_COLORS.red.legend,
            name: 'Фишбон',
            columns: [[20, '83%'], [10, '81%']],
          },
          {
            color: CHART_COLORS.purple.legend,
            name: 'Наклонно-направленная',
            columns: [[5, '73%'], [null, null]],
          },
        ]}
      />
    )
  })
