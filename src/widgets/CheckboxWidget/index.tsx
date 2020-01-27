import React from 'react'

import { Checkbox } from '@gpn-design/uikit'

import { DataMap, DataType } from '@/dashboard/types'
import { themeColorDark } from '@/utils/theme'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Checkbox
type Data = DataMap[typeof dataType]

const widgetId = 'fbeb7619-ae6b-4742-ae62-deea18e1382d'

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
    className={themeColorDark}
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
  id: widgetId,
  name: 'Чекбокс',
  defaultParams,
  dataType,
  Content: CheckboxWidgetContent,
})
