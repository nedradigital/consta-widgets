import React from 'react'

import { DatePicker } from '@/components/DatePicker'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.DatePicker
type Data = DataMap[typeof dataType]

export const widgetId = 'f62a900b-99a2-4194-a277-eb58c49d68ff'

const defaultParams = {}

export const DatePickerWidgetContent: React.FC<WidgetContentProps<Data, {}>> = ({ data }) => (
  <DatePicker {...data} />
)

export const DatePickerWidget = createWidget<Data, {}>({
  id: widgetId,
  name: 'Выбор даты',
  defaultParams,
  dataType,
  Content: DatePickerWidgetContent,
})
