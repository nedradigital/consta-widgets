import React from 'react'

import { Map } from '@/components/Map'
import { DataMap, DataType } from '@/dashboard'
import { MapParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Map
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {}

export const MapWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => {
  return <Map {...data} />
}

export const MapWidget = createWidget<Data, Params>({
  id: widgetIdsByType.MapWidget,
  name: 'Карта',
  dataType,
  defaultParams: {
    growRatio: 1,
  },
  Content: MapWidgetContent,
})
