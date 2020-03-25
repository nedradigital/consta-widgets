import React from 'react'

import { Checkbox } from '@gpn-design/uikit'

import { DataMap, DataType } from '@/dashboard/types'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Checkbox
type Data = DataMap[typeof dataType]

type Params = {
  size: 'm' | 'l'
  content?: React.ReactNode
}

export const defaultParams: Params = {
  size: 'm',
  content: 'Выбор',
}

export const CheckboxWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, content },
}) => (
  <Checkbox
    wpSize={size}
    value={data && data.value}
    disabled={data && data.disabled}
    intermediate={data && data.intermediate}
    onChange={data ? data.onChange : undefined}
  >
    {data && data.content ? data.content : content}
  </Checkbox>
)

export const CheckboxWidget = createWidget<Data, Params>({
  id: widgetIdsByType.CheckboxWidget,
  name: 'Чекбокс',
  defaultParams,
  dataType,
  Content: CheckboxWidgetContent,
})
