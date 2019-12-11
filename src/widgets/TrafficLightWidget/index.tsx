import React from 'react'

import { Size, sizes, TrafficLight, ValueType, valueTypes } from '@/components/TrafficLight'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TrafficLight
type Data = DataMap[typeof dataType]

const widgetId = 'fbeb7619-ae6b-4742-ae62-deea18e1382d'

export type Params = {
  type: ValueType
  size?: Size
}

export const defaultParams: Params = {
  type: 'default',
  size: 's',
}

export const TrafficLightWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, type },
}) => <TrafficLight size={size} type={type} data={data} />

export const TrafficLightWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Светофор',
  defaultParams,
  dataType,
  Content: TrafficLightWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Тип"
          value={params.type}
          onChange={value => onChangeParam('type', value)}
          values={valueTypes.map(i => ({ name: i, value: i }))}
        />
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={sizes.map(i => ({ name: i, value: i }))}
        />
      </>
    )
  },
})
