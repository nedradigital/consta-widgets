import React from 'react'

import { RangePicker } from '@/components/RangePicker'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.RangePicker
type Data = DataMap[typeof dataType]

const widgetId = '6f6de980-a66b-4af4-a6e7-1a48bfe14918'

const defaultParams = {}

export const RangePickerWidgetContent: React.FC<WidgetContentProps<Data, {}>> = ({ data }) => (
  <RangePicker {...data} />
)

export const RangePickerWidget = createWidget<Data, {}>({
  id: widgetId,
  name: 'Выбор диапазона дат',
  defaultParams,
  dataType,
  Content: RangePickerWidgetContent,
})
