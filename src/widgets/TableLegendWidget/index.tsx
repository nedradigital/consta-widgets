import * as React from 'react'

import { Size, sizes, TableLegend } from '@/components/TableLegend'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TableLegend
type Data = DataMap[typeof dataType]

type Params = {
  size: Size
  isShowLegend?: boolean
}

export const widgetId = '2f8f8f8e-21eb-4751-ab81-56ea11ac6342'

export const defaultParams: Params = { size: 'l' }

export const TableLegendWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, isShowLegend },
}) => {
  return <TableLegend data={data} size={size} isShowLegend={isShowLegend} />
}

export const TableLegendWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Таблица с легендой',
  defaultParams,
  dataType,
  Content: TableLegendWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Высота строки"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={sizes.map(i => ({ name: i, value: i }))}
        />
        <WidgetSettingsCheckbox
          name="Показать легенду"
          value={params.isShowLegend}
          onChange={value => onChangeParam('isShowLegend', value)}
        />
      </>
    )
  },
})
