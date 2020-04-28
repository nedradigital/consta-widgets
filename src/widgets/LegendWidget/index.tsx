import { Legend } from '@/components/Legend'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { LegendParams as Params } from '@/dashboard/widget-params'
import { getFormattedFontSizeName } from '@/utils/size-name-formatters'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Legend
type Data = DataMap[typeof dataType]

type ParamValues<T> = { value: T; name: string }

const labelTypes: ReadonlyArray<ParamValues<Params['labelType']>> = [
  {
    value: 'dot',
    name: 'Точка',
  },
  {
    value: 'line',
    name: 'Линия',
  },
]

const sizes: ReadonlyArray<ParamValues<Params['fontSize']>> = [
  {
    value: 's',
    name: 'Стандартный',
  },
  {
    value: 'm',
    name: 'Крупный',
  },
]

const directions: ReadonlyArray<ParamValues<Params['direction']>> = [
  {
    value: 'column',
    name: 'Колонкой',
  },
  {
    value: 'row',
    name: 'В линию',
  },
]

const labelPositions: ReadonlyArray<ParamValues<Params['labelPosition']>> = [
  {
    value: 'left',
    name: 'Слева',
  },
  {
    value: 'top',
    name: 'Сверху',
  },
]

export const defaultParams: Params = {
  fontSize: 's',
  labelType: 'dot',
  labelPosition: 'left',
  direction: 'column',
  lineBold: false,
}

export const LegendWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { fontSize, labelType, labelPosition, direction, lineBold },
  data,
}) => (
  <Legend
    {...data}
    fontSize={fontSize}
    labelType={labelType}
    labelPosition={labelPosition}
    direction={direction}
    lineBold={lineBold}
  />
)

export const LegendWidget = createWidget<Data, Params>({
  id: widgetIdsByType.LegendWidget,
  name: 'Легенда',
  defaultParams,
  dataType,
  Content: LegendWidgetContent,
  renderSettings(params, onChangeParams) {
    return (
      <>
        <WidgetSettingsSelect
          name="Направление легенды"
          value={params.direction}
          onChange={value => onChangeParams({ direction: value })}
          values={directions}
        />
        <WidgetSettingsSelect
          name="Тип лейбла"
          value={params.labelType}
          onChange={value => onChangeParams({ labelType: value })}
          values={labelTypes}
        />
        {params.labelType === 'line' ? (
          <WidgetSettingsSelect
            name="Положение лейбла"
            value={params.labelPosition}
            onChange={value => onChangeParams({ labelPosition: value })}
            values={labelPositions}
          />
        ) : null}
        {params.labelType === 'line' ? (
          <WidgetSettingsCheckbox
            name="Жирность линии"
            value={params.lineBold}
            onChange={value => onChangeParams({ lineBold: value })}
          />
        ) : null}
        <WidgetSettingsSelect
          name="Размер текста"
          value={params.fontSize}
          onChange={value => onChangeParams({ fontSize: value })}
          values={sizes.map(({ name, value }) => ({
            name: getFormattedFontSizeName({ name, value }),
            value,
          }))}
        />
      </>
    )
  },
})
