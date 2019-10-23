import React from 'react'

import { Size, sizes, TrafficLight, ValueType, valueTypes } from '@/components/TrafficLight'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.TrafficLight
type Data = DataMap[typeof dataType]

const widgetId = 'fbeb7619-ae6b-4742-ae62-deea18e1382d'

type Params = {
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
        <WidgetSettingsItem name="Тип">
          <select
            value={params.type}
            onChange={e => onChangeParam('type', e.target.value as ValueType)}
          >
            {valueTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Размер">
          <select value={params.size} onChange={e => onChangeParam('size', e.target.value as Size)}>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
      </>
    )
  },
})
