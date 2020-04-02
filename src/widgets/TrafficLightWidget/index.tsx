import React from 'react'

import { Size, sizes, TrafficLight, ValueType, valueTypes } from '@/components/TrafficLight'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TrafficLight
type Data = DataMap[typeof dataType]

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
  id: widgetIdsByType.TrafficLightWidget,
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
