import React from 'react'

import { Button, WpSize } from '@gpn-design/uikit'

import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Button
type Data = DataMap[typeof dataType]

const widgetId = '950e2e88-06e7-4429-86be-0a26dc93944e'

const widths = ['full', 'auto', undefined] as const
type Width = typeof widths[number]

const views = ['clear', 'primary', 'secondary', 'ghost'] as const
type View = typeof views[number]

const iconAligns = ['left', 'right'] as const
type IconAlign = typeof iconAligns[number]

const forms = [
  'default',
  'brick',
  'round',
  'brick-round',
  'round-brick',
  'brick-default',
  'default-brick',
] as const
type Form = typeof forms[number]

type Params = {
  content?: React.ReactNode
  size: WpSize
  view: View
  width?: Width
  form?: Form
  iconOnly?: boolean
  withIcon?: IconAlign
}

export const defaultParams: Params = {
  size: 's',
  view: 'primary',
  width: 'auto',
  form: 'default',
  iconOnly: false,
}

export const ButtonWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { content, form, iconOnly, size, view, width, withIcon },
}) => (
  <Button
    type="button"
    disabled={data && data.disabled}
    wpSize={size}
    onClick={data && data.onClick}
    view={view}
    width={width}
    form={form}
    iconOnly={iconOnly}
    withIcon={withIcon}
  >
    {data && data.content ? data.content : content}
  </Button>
)

export const ButtonWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Кнопка',
  defaultParams,
  dataType: DataType.Button,
  Content: ButtonWidgetContent,
})
