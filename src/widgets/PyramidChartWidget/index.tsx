import { useState } from 'react'

import { removeAt } from '@csssr/gpn-utils/lib/array'

import { DEFAULT_COLORS, PyramidChart, Size, sizes } from '@/components/PyramidChart'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard/types'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Pyramid
type Data = DataMap[typeof dataType]

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
  colors: DEFAULT_COLORS,
  fontSize: 's',
}

export const PyramidChartWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params,
  data,
}) => <PyramidChart data={data} {...params} />

export const PyramidChartWidget = createWidget<Data, Params>({
  id: widgetIdsByType.PyramidChartWidget,
  name: 'Фиксированная пирамида',
  defaultParams,
  dataType,
  Content: PyramidChartWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsCheckbox
          name="Перенос текста"
          value={params.constraint}
          onChange={value => onChangeParam('constraint', value)}
        />
        <WidgetSettingsSelect
          name="Размер текста"
          value={params.fontSize}
          onChange={value => onChangeParam('fontSize', value)}
          values={sizes.map(i => ({ name: i, value: i }))}
        />
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
