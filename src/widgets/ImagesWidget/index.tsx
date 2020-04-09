import React, { useState } from 'react'

import { ImagesList } from '@/components/ImagesList'
import { ImagesPopup } from '@/components/ImagesPopup'
import { DataMap, DataType } from '@/dashboard'
import { ImagesParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Images
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {}

export const ImagesWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data }) => {
  const [activeImage, setActiveImage] = useState<number | undefined>()

  return (
    <>
      <ImagesList images={data} onClick={setActiveImage} />
      <ImagesPopup
        images={data}
        openOnImage={activeImage}
        onRequestClose={() => setActiveImage(undefined)}
      />
    </>
  )
}

export const ImagesWidget = createWidget<Data, Params>({
  id: widgetIdsByType.ImagesWidget,
  name: 'Картинки',
  dataType,
  defaultParams,
  Content: ImagesWidgetContent,
})
