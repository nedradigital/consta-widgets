import * as React from 'react'

import { RadarChart, radarChartLabelSizes } from '@/components/RadarChart'
import { labelTextSizes } from '@/components/RadarChart/components/Axes'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { RadarChartParams as Params } from '@/dashboard/widget-params'
import { getFormattedFontSizeName } from '@/utils/size-name-formatters'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

export const defaultParams: Params = {
  ticks: 4,
  withConcentricColor: false,
  labelSize: 's',
}

const dataType = DataType.RadarChart
type Data = DataMap[typeof dataType]

export const RadarChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params,
  data,
}) => <RadarChart {...data} {...params} backgroundColor="var(--color-control-bg-default)" />

export const RadarChartWidget = createWidget<Data, Params>({
  id: widgetIdsByType.RadarChartWidget,
  name: 'Радар',
  dataType,
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  Content: RadarChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsNumber
          name="Количество засечек"
          value={params.ticks}
          onChange={value => onChangeParam('ticks', value)}
        />
        <WidgetSettingsSelect
          name="Размер подписи у засечек"
          value={params.labelSize}
          onChange={value => onChangeParam('labelSize', value)}
          values={radarChartLabelSizes.map(value => ({
            name: getFormattedFontSizeName({ name: value, value: labelTextSizes[value] }),
            value,
          }))}
        />
        <WidgetSettingsCheckbox
          name="Раскрасить градиентом"
          value={params.withConcentricColor}
          onChange={value => onChangeParam('withConcentricColor', value)}
        />
      </>
    )
  },
})
