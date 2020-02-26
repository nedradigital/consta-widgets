import React from 'react'

import { DatePicker, Size, sizes } from '@/components/DatePicker'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.DatePicker
type Data = DataMap[typeof dataType]

export const widgetId = 'f62a900b-99a2-4194-a277-eb58c49d68ff'

type Params = {
  size: Size
}

export const defaultParams: Params = {
  size: 'm',
}

export const DatePickerWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size },
}) => <DatePicker {...data} size={size} />

export const DatePickerWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Выбор даты',
  defaultParams,
  dataType,
  Content: DatePickerWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <WidgetSettingsSelect
        name="Размер"
        value={params.size}
        onChange={value => onChangeParam('size', value)}
        values={sizes.map(i => ({ name: i, value: i }))}
      />
    )
  },
})
