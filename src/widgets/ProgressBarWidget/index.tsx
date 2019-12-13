import * as React from 'react'

import { ProgressBar, Size, sizes } from '@/components/ProgressBar'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.ProgressBar
type Data = DataMap[typeof dataType]

const widgetId = '944a8e67-5604-444f-afe0-f4a3263b734a'

type Params = {
  size: Size
  isCaptionBold?: boolean
}

export const defaultParams: Params = {
  size: 'm',
  isCaptionBold: false,
}

export const ProgressBarWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, isCaptionBold },
}) => {
  return <ProgressBar size={size} isCaptionBold={isCaptionBold} {...data} />
}

export const ProgressBarWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Прогресс-бар ("градусник")',
  defaultParams,
  dataType,
  Content: ProgressBarWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={sizes.map(i => ({ name: i, value: i }))}
        />
        <WidgetSettingsCheckbox
          name="Заголовок жирный"
          value={params.isCaptionBold}
          onChange={value => onChangeParam('isCaptionBold', value)}
        />
      </>
    )
  },
})
