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

export const widgetId = 'e63c468b-75bd-4c5c-95c7-696e598db6e3'

type Params = {
  withZoom?: boolean
  isHorizontal?: boolean
  xLabels?: XLabelsPosition
  xLabelTicks?: number
  xGridTicks?: number
  xGuide?: boolean
  xWithPaddings?: boolean
  yLabels?: YLabelsPosition
  yLabelTicks?: number
  yGridTicks?: number
  yGuide?: boolean
  unit?: string
  yWithPaddings?: boolean
}

export const defaultParams: Params = {
  isHorizontal: true,
  withZoom: false,
  xLabels: 'bottom',
  xLabelTicks: 0,
  xGridTicks: 0,
  xGuide: false,
  xWithPaddings: false,
  yLabels: 'left',
  yLabelTicks: 0,
  yGridTicks: 0,
  yGuide: false,
  unit: '',
  yWithPaddings: false,
}

export const LinearChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: {
    isHorizontal,
    withZoom,
    xLabels,
    xLabelTicks,
    xGridTicks,
    xGuide,
    xWithPaddings,
    yLabels,
    yLabelTicks,
    yGridTicks,
    yGuide,
    yWithPaddings,
  },
  data: {
    data,
    colorGroups,
    formatValueForLabel,
    formatValueForTooltip,
    formatValueForTooltipTitle,
    unit,
    threshold,
    onClickHoverLine,
  },
}) => (
  <LinearChart
    gridConfig={{
      x: {
        labels: xLabels,
        labelTicks: xLabelTicks,
        gridTicks: xGridTicks,
        guide: xGuide,
        withPaddings: xWithPaddings,
      },
      y: {
        labels: yLabels,
        labelTicks: yLabelTicks,
        gridTicks: yGridTicks,
        guide: yGuide,
        withPaddings: yWithPaddings,
      },
    }}
    lines={data}
    colorGroups={colorGroups}
    withZoom={withZoom}
    isHorizontal={Boolean(isHorizontal)}
    formatValueForLabel={formatValueForLabel ? formatValueForLabel : v => String(v)}
    formatValueForTooltip={formatValueForTooltip}
    formatValueForTooltipTitle={formatValueForTooltipTitle}
    unit={unit}
    threshold={threshold}
    onClickHoverLine={onClickHoverLine}
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
          name="Горизонтальное отображение"
          value={params.isHorizontal}
          onChange={value => onChangeParam('isHorizontal', value)}
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
          name="Отображать отступы на оси"
          value={params.xWithPaddings}
          onChange={value => onChangeParam('xWithPaddings', value)}
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
          name="Отображать отступы на оси"
          value={params.yWithPaddings}
          onChange={value => onChangeParam('yWithPaddings', value)}
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
