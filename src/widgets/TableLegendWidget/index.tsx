import { ChangeEvent } from 'react'
import * as React from 'react'

import { Size, sizes, TableLegend } from '@/components/TableLegend'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TableLegend
type Data = DataMap[typeof dataType]

type Params = {
  size: Size
  isShowLegend?: boolean
}

const widgetId = '2f8f8f8e-21eb-4751-ab81-56ea11ac6342'

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
        <WidgetSettingsItem name="Высота строки">
          <select
            value={params.size}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              onChangeParam('size', e.target.value as Size)
            }}
          >
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Показать легенду">
          <input
            type="checkbox"
            checked={params.isShowLegend}
            onChange={e => onChangeParam('isShowLegend', e.target.checked)}
          />
        </WidgetSettingsItem>
      </>
    )
  },
})
