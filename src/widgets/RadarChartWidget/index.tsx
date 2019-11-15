import * as React from 'react'

import { RadarChart, RadarChartLabelSize, radarChartLabelSizes } from '@/components/RadarChart'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

type Params = {
  ticks: number
  withConcentricColor: boolean
  labelSize: RadarChartLabelSize
}

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
}) => <RadarChart {...data} {...params} backgroundColor="var(--bg-box)" />

export const RadarChartWidget = createWidget<Data, Params>({
  id: '94456b61-fba4-4121-a29c-a313cac4f4c0',
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
        <WidgetSettingsItem name="Количество засечек">
          <input
            type="number"
            value={params.ticks}
            onChange={e => onChangeParam('ticks', Number(e.target.value))}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Размер подписи у засечек">
          <select
            value={params.labelSize}
            onChange={e => onChangeParam('labelSize', e.target.value as RadarChartLabelSize)}
          >
            {radarChartLabelSizes.map(labelSize => (
              <option key={labelSize} value={labelSize}>
                {labelSize}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Раскрасить градиентом">
          <input
            type="checkbox"
            checked={params.withConcentricColor}
            onChange={e => onChangeParam('withConcentricColor', e.target.checked)}
          />
        </WidgetSettingsItem>
      </>
    )
  },
})
