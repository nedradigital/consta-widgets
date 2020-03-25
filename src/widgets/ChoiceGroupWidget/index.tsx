import React from 'react'

import { ChoiceGroup } from '@gpn-design/uikit'

import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.ChoiceGroup
type Data = DataMap[typeof dataType]

const sizes = ['xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

const forms = ['default', 'round', 'brick'] as const
type Form = typeof forms[number]

type Params = {
  size: Size
  form?: Form
}

export const defaultParams: Params = {
  size: 's',
  form: 'default',
}

export type Choice = string | number
export type ChoiceItems = ReadonlyArray<{ label: string; value: Choice }>
export type ChoiceGroupData = {
  disabled: boolean
  items: ChoiceItems
} & (SingleChoice | MultipleChoice)

type SingleChoice = {
  isMultiple: false
  value: Choice | null
  onChange: (newValue: Choice | null) => void
}
type MultipleChoice = {
  isMultiple: true
  value: readonly Choice[]
  onChange: (newValue: readonly Choice[]) => void
}

export const ChoiceGroupWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, form },
}) => {
  const restProps = data.isMultiple
    ? {
        isMultiple: true as const,
        value: [...data.value],
        onChange: data.onChange,
      }
    : {
        isMultiple: false as const,
        value: data.value,
        onChange: data.onChange,
      }
  return (
    <ChoiceGroup
      wpSize={size}
      items={[...data.items]}
      disabled={data && data.disabled}
      form={form}
      {...restProps}
    />
  )
}

export const ChoiceGroupWidget = createWidget<Data, Params>({
  id: widgetIdsByType.ChoiceGroupWidget,
  name: 'Choice Group',
  defaultParams,
  dataType: DataType.ChoiceGroup,
  Content: ChoiceGroupWidgetContent,
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
          name="Форма"
          value={params.form}
          values={forms.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('form', value)}
        />
      </>
    )
  },
})
