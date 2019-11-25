import { Direction, Legend } from '@/components/Legend'
import { Position, Size, Type } from '@/components/LegendItem'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Legend
type Data = DataMap[typeof dataType]

const widgetId = '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00'

type Params = {
  direction: Direction
  labelType: Type
  fontSize: Size
  labelPosition: Position
  lineBold?: boolean
}

type ParamValues<T> = { value: T; name: string }

const labelTypes: ReadonlyArray<ParamValues<Type>> = [
  {
    value: 'dot',
    name: 'Точка',
  },
  {
    value: 'line',
    name: 'Линия',
  },
]

const sizes: ReadonlyArray<ParamValues<Size>> = [
  {
    value: 's',
    name: 'Стандартный',
  },
  {
    value: 'm',
    name: 'Крупный',
  },
]

const directions: ReadonlyArray<ParamValues<Direction>> = [
  {
    value: 'column',
    name: 'Колонкой',
  },
  {
    value: 'row',
    name: 'В линию',
  },
]

const labelPositions: ReadonlyArray<ParamValues<Position>> = [
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
  id: widgetId,
  name: 'Легенда',
  defaultParams,
  dataType,
  Content: LegendWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Направление легенды">
          <select
            value={params.direction}
            onChange={e => onChangeParam('direction', e.target.value as Direction)}
          >
            {directions.map(direction => (
              <option key={direction.value} value={direction.value}>
                {direction.name}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Тип лейбла">
          <select
            value={params.labelType}
            onChange={e => onChangeParam('labelType', e.target.value as Type)}
          >
            {labelTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        {params.labelType === 'line' ? (
          <WidgetSettingsItem name="Положение лейбла">
            <select
              value={params.labelPosition}
              onChange={e => onChangeParam('labelPosition', e.target.value as Position)}
            >
              {labelPositions.map(pos => (
                <option key={pos.value} value={pos.value}>
                  {pos.name}
                </option>
              ))}
            </select>
          </WidgetSettingsItem>
        ) : null}
        {params.labelType === 'line' ? (
          <WidgetSettingsItem name="Жирность линии">
            <input
              type="checkbox"
              checked={params.lineBold}
              onChange={e => onChangeParam('lineBold', e.target.checked)}
            />
          </WidgetSettingsItem>
        ) : null}
        <WidgetSettingsItem name="Размер текста">
          <select
            value={params.fontSize}
            onChange={e => onChangeParam('fontSize', e.target.value as Size)}
          >
            {sizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
      </>
    )
  },
})
