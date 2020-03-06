import React, { useState } from 'react'

import { ImagesList } from '@/components/ImagesList'
import { ImagesPopup } from '@/components/ImagesPopup'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Images
type Data = DataMap[typeof dataType]

export const widgetId = 'd1a60ed1-96de-49b2-badd-052e0408d55a'

type Params = { [key: string]: never }

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
  id: widgetId,
  name: 'Картинки',
  dataType,
  defaultParams,
  Content: ImagesWidgetContent,
})
