import { LinearChart } from '@/components/LinearChart'
import { XLabelsPosition, YLabelsPosition } from '@/components/LinearChart/components/Axis'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.LinearChart
type Data = DataMap[typeof dataType]

const widgetId = 'e63c468b-75bd-4c5c-95c7-696e598db6e3'

type Params = {
  withZoom?: boolean
  isVertical?: boolean
  xLabels?: XLabelsPosition
  xLabelTicks?: number
  xGridTicks?: number
  xGuide?: boolean
  yLabels?: YLabelsPosition
  yLabelTicks?: number
  yGridTicks?: number
  yGuide?: boolean
  unit?: string
}

export const defaultParams: Params = {
  isVertical: false,
  withZoom: false,
  xLabels: 'bottom',
  xLabelTicks: 0,
  xGridTicks: 0,
  xGuide: false,
  yLabels: 'left',
  yLabelTicks: 0,
  yGridTicks: 0,
  yGuide: false,
  unit: '',
}

export const LinearChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: {
    isVertical,
    withZoom,
    xLabels,
    xLabelTicks,
    xGridTicks,
    xGuide,
    yLabels,
    yLabelTicks,
    yGridTicks,
    yGuide,
  },
  data: {
    data,
    colorGroups,
    formatValueForLabel,
    formatValueForTooltip,
    formatValueForTooltipTitle,
    unit,
  },
}) => (
  <LinearChart
    gridConfig={{
      x: {
        labels: xLabels,
        labelTicks: xLabelTicks,
        gridTicks: xGridTicks,
        guide: xGuide,
      },
      y: {
        labels: yLabels,
        labelTicks: yLabelTicks,
        gridTicks: yGridTicks,
        guide: yGuide,
      },
    }}
    lines={data}
    colorGroups={colorGroups}
    withZoom={withZoom}
    isVertical={isVertical}
    formatValueForLabel={formatValueForLabel ? formatValueForLabel : v => String(v)}
    formatValueForTooltip={formatValueForTooltip}
    formatValueForTooltipTitle={formatValueForTooltipTitle}
    unit={unit}
  />
)

export const LinearChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Линейный график',
  defaultParams: {
    ...defaultParams,
    growRatio: 1,
  },
  dataType: DataType.LinearChart,
  Content: LinearChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsCheckbox
          name="Вертикальное отображение"
          value={params.isVertical}
          onChange={value => onChangeParam('isVertical', value)}
        />
        <WidgetSettingsCheckbox
          name="Зум"
          value={params.withZoom}
          onChange={value => onChangeParam('withZoom', value)}
        />

        <p>Настройка оси Х</p>
        <WidgetSettingsSelect
          name="Расположение оси"
          value={params.xLabels}
          onChange={value => onChangeParam('xLabels', value)}
          values={[
            {
              name: 'Сверху',
              value: 'top',
            },
            {
              name: 'Снизу',
              value: 'bottom',
            },
          ]}
        />
        <WidgetSettingsNumber
          name="Частота обновления подписей"
          value={params.xLabelTicks}
          onChange={value => onChangeParam('xLabelTicks', value)}
        />
        <WidgetSettingsNumber
          name="Частота обновления линий"
          value={params.xGridTicks}
          onChange={value => onChangeParam('xGridTicks', value)}
        />
        <WidgetSettingsCheckbox
          name="Отображать нулевую ось"
          value={params.xGuide}
          onChange={value => onChangeParam('xGuide', value)}
        />

        <p>Настройка оси Y</p>
        <WidgetSettingsSelect
          name="Расположение оси"
          value={params.yLabels}
          onChange={value => onChangeParam('yLabels', value)}
          values={[
            {
              name: 'Слева',
              value: 'left',
            },
            {
              name: 'Справа',
              value: 'right',
            },
          ]}
        />
        <WidgetSettingsNumber
          name="Частота обновления подписей"
          value={params.yLabelTicks}
          onChange={value => onChangeParam('yLabelTicks', value)}
        />
        <WidgetSettingsNumber
          name="Частота обновления линий"
          value={params.yGridTicks}
          onChange={value => onChangeParam('yGridTicks', value)}
        />
        <WidgetSettingsCheckbox
          name="Отображать нулевую ось"
          value={params.yGuide}
          onChange={value => onChangeParam('yGuide', value)}
        />
        <WidgetSettingsText
          name="Единица измерения оси Y"
          value={params.unit}
          onChange={value => onChangeParam('unit', value)}
        />
      </>
    )
  },
})
