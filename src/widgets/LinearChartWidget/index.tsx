import { LinearChart } from '@/components/LinearChart'
import { XLabelsPosition, YLabelsPosition } from '@/components/LinearChart/components/Axis'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
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
  data,
}) => (
  // TODO Нужно сделать растягивание виджетов с графиками по высоте внутри боксов
  // @see https://jira.csssr.io/browse/GINF-50
  <div style={{ height: 300 }}>
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
      withZoom={withZoom}
      isVertical={isVertical}
    />
  </div>
)

export const LinearChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Линейный график',
  defaultParams,
  dataType: DataType.LinearChart,
  Content: LinearChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Вертикальное отображение">
          <input
            type="checkbox"
            checked={params.isVertical}
            onChange={e => onChangeParam('isVertical', e.target.checked)}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Зум">
          <input
            type="checkbox"
            checked={params.withZoom}
            onChange={e => onChangeParam('withZoom', e.target.checked)}
          />
        </WidgetSettingsItem>

        <p>Настройка оси Х</p>
        <WidgetSettingsItem name="Расположение оси">
          <select
            value={params.xLabels}
            onChange={e => onChangeParam('xLabels', e.target.value as XLabelsPosition)}
          >
            {['top', 'bottom'].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Частота обновления подписей">
          <input
            type="text"
            value={params.xLabelTicks}
            onChange={e => onChangeParam('xLabelTicks', Number(e.target.value))}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Частота обновления линий">
          <input
            type="text"
            value={params.xGridTicks}
            onChange={e => onChangeParam('xGridTicks', Number(e.target.value))}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Отображать нулевую ось">
          <input
            type="checkbox"
            checked={params.xGuide}
            onChange={e => onChangeParam('xGuide', e.target.checked)}
          />
        </WidgetSettingsItem>

        <p>Настройка оси Y</p>
        <WidgetSettingsItem name="Расположение оси">
          <select
            value={params.yLabels}
            onChange={e => onChangeParam('yLabels', e.target.value as YLabelsPosition)}
          >
            {['left', 'right'].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Частота обновления подписей">
          <input
            type="text"
            value={params.yLabelTicks}
            onChange={e => onChangeParam('yLabelTicks', Number(e.target.value))}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Частота обновления линий">
          <input
            type="text"
            value={params.yGridTicks}
            onChange={e => onChangeParam('yGridTicks', Number(e.target.value))}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Отображать нулевую ось">
          <input
            type="checkbox"
            checked={params.yGuide}
            onChange={e => onChangeParam('yGuide', e.target.checked)}
          />
        </WidgetSettingsItem>
      </>
    )
  },
})
