import * as React from 'react'

import { Stats } from '@/components/Stats'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { statsParams, StatsParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Stats
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  size: 'xs',
  layout: 'full',
}

export const StatsWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params,
}) => <Stats {...data} {...params} />

export const StatsWidget = createWidget<Data, Params>({
  id: widgetIdsByType.StatsWidget,
  name: 'Статы',
  defaultParams,
  dataType,
  Content: StatsWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={statsParams.sizes.map(i => ({ value: i, name: i }))}
        />
        <WidgetSettingsSelect
          name="Расположение элементов"
          value={params.layout}
          onChange={value => onChangeParam('layout', value)}
          values={statsParams.layouts.map(i => ({ value: i, name: i }))}
        />
      </>
    )
  },
})
