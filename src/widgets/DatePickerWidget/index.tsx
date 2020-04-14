import React from 'react'

import { DatePicker } from '@/components/DatePicker'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { datePickerParams, DatePickerParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.DatePicker
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  size: 'm',
}

export const DatePickerWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size },
}) => <DatePicker {...data} size={size} />

export const DatePickerWidget = createWidget<Data, Params>({
  id: widgetIdsByType.DatePickerWidget,
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
        values={datePickerParams.sizes.map(i => ({ name: i, value: i }))}
      />
    )
  },
})
