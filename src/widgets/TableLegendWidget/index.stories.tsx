import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, object, select } from '@storybook/addon-knobs'

import { tableLegendParams } from '@/dashboard/widget-params'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, TableLegendWidget, TableLegendWidgetContent } from '.'

const getInitialParams = () => ({
  size: select('Высота строки', tableLegendParams.sizes, defaultParams.size),
  isShowLegend: boolean('Показать легенду', false),
  isResizable: boolean('Настраиваемая ширина колонок', true),
  isSortable: boolean('Разрешать сортировку', true),
})

export const Interactive = createStory(() => (
  <TableLegendWidgetContent
    data={object('data', TableLegendWidget.mockData)}
    params={getInitialParams()}
  />
))

export const TableLegendWidgetWithSelectedRow = createStory(
  () => {
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
        params={getInitialParams()}
      />
    )
  },
  { name: 'c возможностью выбора активной строки' }
)

export default createMetadata({
  title: 'widgets/TableLegendWidget',
  decorators: [blockCenteringDecorator()],
})
