import * as React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { array, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { statuses } from '@/ui/Badge'
import { getArrayWithRandomInt } from '@/utils/array'

import { Constructor, DashboardState, DataType } from './'
import { BoxItem } from './components/Box'

const margin = [15, 15] as [number, number]
const datasets = [
  {
    name: 'График добычи нефти',
    type: DataType.Chart2D,
    data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
  },
  {
    name: 'Работа скважины',
    type: DataType.Chart2D,
    data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
  },
  {
    name: 'Доля полезного продукта',
    type: DataType.PieChart,
    data: { a: 10, b: 20, c: 70 },
  },
]
const cols = { lg: 6, md: 5, sm: 4, xs: 4, xxs: 2 }

const dataForWidget: { [key: string]: {} } = {
  AccumulatedTotal: {
    cost: {
      value: -88,
      percent: -2.1,
      status: statuses[0],
    },
    incidents: {
      value: -121.3,
      percent: -16.2,
      status: statuses[1],
    },
    deadlines: {
      value: -217,
      percent: -2.1,
      status: statuses[2],
    },
    time: {
      value: 1.1,
      percent: -1.3,
    },
  },
  CostGraph: getArrayWithRandomInt(5, 10, 12 * 4),
  TechnologicalInnovation: [
    {
      text: 'Предиктивное моделирование пластов',
      label: 'Research',
    },
    {
      text: 'Визуализация процессов бурения',
      label: 'Test',
    },
    {
      text: 'Система «Виртуальный бурильщик»',
      label: 'MVP',
    },
  ],
}

const propsForWidget: { [key: string]: {} } = {
  AccumulatedTotal: {},
  CostGraph: {
    title: 'стоимость к продуктивности',
    unitName: 'руб/ м³ /сут Х атм',
    legendName: 'средневзвешенная',
  },
  TechnologicalInnovation: {},
} as { [key: string]: {} }

storiesOf('dashboard/Constructor', module)
  .addDecorator(withSmartKnobs)
  .add('default constructor', () => {
    return (
      <Constructor
        margin={margin}
        datasets={datasets}
        cols={cols}
        dashboard={{ boxes: [], layouts: {} }}
        config={{}}
      />
    )
  })
  .add('with state', () => {
    function Wrapper() {
      const [dashboard, setDashboard] = React.useState<DashboardState>({
        boxes: [],
        layouts: {},
      })
      const [viewMode, setViewMode] = React.useState(false)
      const [config, changeConfig] = React.useState<{ [key: string]: BoxItem[] }>({})

      const handler = (name: string, items: BoxItem[]) => {
        if (items.length > 0) {
          const lastItem = items[items.length - 1]
          if (lastItem.type === 'widget') {
            items[items.length - 1] = {
              ...lastItem,
              props: {
                ...(propsForWidget[lastItem.name] || {}),
                data: dataForWidget[lastItem.name] || {},
              },
            }
          }
        }

        changeConfig({
          ...config,
          [name]: items,
        })
      }

      return (
        <Constructor
          margin={array('margin', margin) as [number, number]}
          datasets={object('datasets', datasets)}
          cols={object('cols', cols)}
          dashboard={dashboard}
          onChange={setDashboard}
          onClear={() => {
            localStorage.removeItem('data')
            location.reload()
          }}
          onToggleMode={() => setViewMode(!viewMode)}
          viewMode={viewMode}
          onChangeWidgets={handler}
          config={config}
        />
      )
    }

    return <Wrapper />
  })
