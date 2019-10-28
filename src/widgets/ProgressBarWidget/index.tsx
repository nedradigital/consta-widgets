import * as React from 'react'

import { ProgressBar, Size, sizes } from '@/components/ProgressBar'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.ProgressBar
type Data = DataMap[typeof dataType]

const widgetId = '944a8e67-5604-444f-afe0-f4a3263b734a'

type Params = {
  size: Size
}

export const defaultParams: Params = {
  size: 'm',
}

export const ProgressBarWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size },
}) => {
  return <ProgressBar size={size} data={data} />
}

export const ProgressBarWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Прогресс-бар ("градусник")',
  defaultParams,
  dataType: DataType.ProgressBar,
  Content: ProgressBarWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
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
