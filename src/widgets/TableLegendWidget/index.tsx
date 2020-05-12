import * as React from 'react'

import { TableLegend } from '@/components/TableLegend'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { tableLegendParams, TableLegendParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TableLegend
type Data = DataMap[typeof dataType]

export const defaultParams: Params = { size: 'l', isResizable: true, isSortable: true }

export const TableLegendWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, isShowLegend, isResizable, isSortable },
}) => {
  return (
    <TableLegend
      data={data}
      size={size}
      isShowLegend={isShowLegend}
      isResizable={isResizable}
      isSortable={isSortable}
    />
  )
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
          values={tableLegendParams.sizes.map(i => ({ name: i, value: i }))}
        />
        <WidgetSettingsCheckbox
          name="Показать легенду"
          value={params.isShowLegend}
          onChange={value => onChangeParam('isShowLegend', value)}
        />
        <WidgetSettingsCheckbox
          name="Настраиваемая ширина колонок"
          value={params.isResizable}
          onChange={value => onChangeParam('isResizable', value)}
        />
        <WidgetSettingsCheckbox
          name="Разрешать сортировку"
          value={params.isSortable}
          onChange={value => onChangeParam('isSortable', value)}
        />
      </>
    )
  },
})
