import React from 'react'

import { Image } from '@/components/Image'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Image
type Data = DataMap[typeof dataType]

export const widgetId = '4cbc790b-7124-402f-8c7f-ec48b3403f74'

type Params = {}

export const defaultParams: Params = {}

export const ImageWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => {
  return <Image src={data} />
}

export const ImageWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Картинка',
  dataType,
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  Content: ImageWidgetContent,
})
