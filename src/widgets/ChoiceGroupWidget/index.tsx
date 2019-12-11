import React, { useState } from 'react'

import { ChoiceGroup } from '@gpn-design/uikit'

import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.ChoiceGroup
type Data = DataMap[typeof dataType]

const widgetId = '430768bb-be37-42b0-a1e7-57c6c1bebcea'

const forms = ['default', 'round', 'brick'] as const
type Form = typeof forms[number]

type Params = {
  size: any
  form?: Form
  isMultiple: boolean
}

export const defaultParams: Params = {
  size: 's',
  form: 'default',
  isMultiple: false,
}

type Choice = string | number

export const ChoiceGroupWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, isMultiple, form },
}) => {
  const [singleValue, setSingleValue] = useState<Choice | null>()
  const [multipleValue, setMultipleValue] = useState<readonly Choice[]>([])

  const valueProps = isMultiple
    ? // tslint:disable-next-line readonly-array
      ({ isMultiple: true, value: multipleValue as Choice[], onChange: setMultipleValue } as const)
    : ({ isMultiple: false, value: singleValue, onChange: setSingleValue } as const)

  return (
    <ChoiceGroup
      {...valueProps}
      className={css.choiceGroup}
      wpSize={size}
      items={[...data.items]}
      disabled={data && data.disabled}
      form={form}
    />
  )
}

export const ChoiceGroupWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Choice Group',
  defaultParams,
  dataType: DataType.ChoiceGroup,
  Content: ChoiceGroupWidgetContent,
})
