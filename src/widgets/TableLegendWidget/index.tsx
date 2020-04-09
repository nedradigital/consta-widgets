import * as React from 'react'

import { sizes, TableLegend } from '@/components/TableLegend'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { TableLegendParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TableLegend
type Data = DataMap[typeof dataType]

export const defaultParams: Params = { size: 'l' }

export const TableLegendWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, isShowLegend },
}) => {
  return <TableLegend data={data} size={size} isShowLegend={isShowLegend} />
}

export const TableLegendWidget = createWidget<Data, Params>({
  id: widgetIdsByType.TableLegendWidget,
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
