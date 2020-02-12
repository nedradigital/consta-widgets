import React from 'react'

import { Button } from '@gpn-design/uikit'

import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Button
type Data = DataMap[typeof dataType]

export const widgetId = '950e2e88-06e7-4429-86be-0a26dc93944e'

const widths = ['full', 'auto'] as const
type Width = typeof widths[number]

const sizes = ['xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

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
  size: Size
  view: View
  width: Width
  form: Form
  content?: string
  withIcon?: IconAlign
}

export const defaultParams: Params = {
  size: 's',
  view: 'primary',
  width: 'auto',
  form: 'default',
}

export const ButtonWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { content, form, size, view, width, withIcon },
}) => (
  <Button
    type="button"
    disabled={data && data.disabled}
    wpSize={size}
    onClick={data && data.onClick}
    view={view}
    width={width}
    form={form}
    iconOnly={data && data.iconOnly}
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
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          values={sizes.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('size', value)}
        />
        <WidgetSettingsSelect
          name="Вид"
          value={params.view}
          values={views.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('view', value)}
        />
        <WidgetSettingsSelect
          name="Ширина"
          value={params.width}
          values={widths.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('width', value)}
        />
        <WidgetSettingsSelect
          name="Форма"
          value={params.form}
          values={forms.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('form', value)}
        />
        <WidgetSettingsText
          name="Текст"
          value={params.content}
          onChange={value => onChangeParam('content', value)}
        />
        <b>Если есть иконка:</b>
        <WidgetSettingsSelect
          name="Расположение иконки"
          value={params.withIcon}
          values={iconAligns.map(item => ({ value: item, name: item || '--' }))}
          withEmptyValue
          onChange={value => onChangeParam('withIcon', value)}
        />
      </>
    )
  },
})
