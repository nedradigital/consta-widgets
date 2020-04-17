import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { tableLegendParams } from '@/dashboard/widget-params'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TableLegendWidget, TableLegendWidgetContent } from '.'

const TableLegendWidgetWithSelectedRow = () => {
  const [activeRowId, setActiveRowId] = React.useState<string | undefined>()

  return (
    <TableLegendWidgetContent
      data={{
        ...object('data', TableLegendWidget.mockData),
        activeRow: {
          id: activeRowId,
          onChange: id => {
            action('onChange')(id)
            setActiveRowId(id)
          },
        },
      }}
      params={{
        size: select('Высота строки', tableLegendParams.sizes, defaultParams.size),
        isShowLegend: boolean('Показать легенду', false),
      }}
    />
  )
}

storiesOf('widgets/TableLegendWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TableLegendWidgetContent
      data={object('data', TableLegendWidget.mockData)}
      params={{
        size: select('Высота строки', tableLegendParams.sizes, defaultParams.size),
        isShowLegend: boolean('Показать легенду', false),
      }}
    />
  ))
  .add('clickable row', () => <TableLegendWidgetWithSelectedRow />)
