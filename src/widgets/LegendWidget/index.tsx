import { useState } from 'react'

import { DataItem, Direction, Legend } from '@/components/Legend'
import { Position, Size, Type } from '@/components/LegendItem'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { removeAt } from '@/utils/array'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

type Data = typeof undefined

type Params = {
  direction: Direction
  labelType: Type
  fontSize: Size
  labelPosition: Position
  lineBold?: boolean
  items: readonly DataItem[]
}

type ParamValues<T> = { value: T; name: string }

type AddLabelProps = {
  onAdd: (item: DataItem) => void
}

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
  items: [
    {
      text: 'Пример легенды',
      color: 'red',
    },
  ],
}

const AddLabel: React.FC<AddLabelProps> = ({ onAdd }) => {
  const [color, changeColor] = useState('rgb(0, 0, 0)')
  const [text, changeText] = useState('пример текста')

  const handler = () => {
    onAdd({ color, text })
    changeColor('')
    changeText('')
  }

  return (
    <div>
      <input type="text" value={text} onChange={e => changeText(e.target.value)} />
      <input type="color" value={color} onChange={e => changeColor(e.target.value)} />
      <button type="button" onClick={handler}>
        ➕
      </button>
    </div>
  )
}

export const LegendWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { fontSize, labelType, labelPosition, direction, lineBold, items },
}) => (
  <Legend
    data={items}
    fontSize={fontSize}
    labelType={labelType}
    labelPosition={labelPosition}
    direction={direction}
    lineBold={lineBold}
  />
)

export const LegendWidget = createWidget<Data, Params>({
  name: 'Легенда',
  defaultParams,
  dataType: null,
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

        <WidgetSettingsItem name="Лейблы">
          <div>
            {params.items.map((item, index) => (
              <div key={item.text}>
                <div>{item.text}</div>
                <button
                  type="button"
                  onClick={() => onChangeParam('items', removeAt(params.items, index))}
                >
                  ➖
                </button>
              </div>
            ))}
          </div>
        </WidgetSettingsItem>

        <AddLabel
          onAdd={newItem => {
            onChangeParam('items', [...params.items, newItem])
          }}
        />
      </>
    )
  },
})
