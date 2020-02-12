import React from 'react'

import { Map } from '@/components/Map'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Map
type Data = DataMap[typeof dataType]

type Params = {}

export const widgetId = '6d34ccb1-bfc6-4898-a520-7e3c8194a378'

export const defaultParams: Params = {}

export const MapWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => {
  return <Map {...data} />
}

export const MapWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Карта',
  dataType,
  defaultParams: {
    growRatio: 1,
  },
  Content: MapWidgetContent,
})
