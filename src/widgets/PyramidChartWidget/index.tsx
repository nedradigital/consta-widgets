import { useState } from 'react'

import { PyramidChart, Size, sizes } from '@/components/PyramidChart'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { DataMap, DataType } from '@/dashboard/types'
import { removeAt } from '@/utils/array'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Pyramid
type Data = DataMap[typeof dataType]

export const widgetId = '7adf7782-03cd-4452-bfc7-20f1c02d8eac'

type Params = {
  constraint?: boolean
  fontSize?: Size
  colors: readonly string[]
}

type AddLabelProps = {
  onAdd: (item: string) => void
}

const AddColor: React.FC<AddLabelProps> = ({ onAdd }) => {
  const [color, changeColor] = useState('rgb(0, 0, 0)')

  const handler = () => {
    onAdd(color)
    changeColor('')
  }

  return (
    <div>
      <input type="color" value={color} onChange={e => changeColor(e.target.value)} />
      <button type="button" onClick={handler}>
        ➕
      </button>
    </div>
  )
}

export const defaultParams: Params = {
  constraint: true,
  colors: ['#FC4449', '#FF6D32', '#FF9724', '#F7CC1D', '#59D72C', '#00BD59'],
  fontSize: 's',
}

export const PyramidChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params,
  data,
}) => <PyramidChart data={data} {...params} />

export const PyramidChartWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Фиксированная пирамида',
  defaultParams,
  dataType,
  Content: PyramidChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Перенос текста">
          <input
            type="checkbox"
            checked={params.constraint}
            onChange={e => onChangeParam('constraint', e.target.checked)}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Размер текста">
          <select
            value={params.fontSize}
            onChange={e => onChangeParam('fontSize', e.target.value as Size)}
          >
            {sizes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Цвета">
          <div>
            {params.colors.map((color, index) => (
              <div key={color}>
                <input type="color" value={color} disabled />
                <button
                  type="button"
                  onClick={() => onChangeParam('colors', removeAt(params.colors, index))}
                >
                  ➖
                </button>
              </div>
            ))}
          </div>
        </WidgetSettingsItem>

        <AddColor
          onAdd={newItem => {
            onChangeParam('colors', [...params.colors, newItem])
          }}
        />
      </>
    )
  },
})
