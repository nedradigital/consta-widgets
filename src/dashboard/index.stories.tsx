import * as React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { Dataset, DataType } from '@/dashboard/types'

import { Constructor, DashboardState } from './'
import { BoxItem } from './components/Box'

const getMargin = () => [number('margin x', 15), number('margin y', 15)] as const

export const exampleDatasets: readonly Dataset[] = [
  {
    name: 'График добычи нефти',
    type: DataType.Chart2D,
    id: 'oil',
  },
  {
    name: 'Работа скважины',
    type: DataType.Chart2D,
    id: 'skvazhina',
  },
  {
    name: 'Доля полезного продукта',
    type: DataType.PieChart,
    id: 'product',
  },
  {
    name: 'Потрачено',
    type: DataType.NumberWithPercentAndStatus,
    id: 'wasted',
  },
]
const cols = { lg: 6, md: 5, sm: 4, xs: 4, xxs: 2 }

storiesOf('dashboard/Constructor', module)
  .addDecorator(withSmartKnobs)
  .add('default constructor', () => {
    return (
      <Constructor
        viewMode={false}
        margin={getMargin()}
        datasets={exampleDatasets}
        cols={cols}
        dashboard={{ boxes: [], layouts: {} }}
        config={{}}
        data={{}}
        onChange={() => {
          /**/
        }}
        onChangeWidgets={() => {
          /**/
        }}
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
      const [config, changeConfig] = React.useState<{ [key: string]: readonly BoxItem[] }>({})

      const handler = (name: string, items: readonly BoxItem[]) => {
        changeConfig({
          ...config,
          [name]: items,
        })
      }

      return (
        <Constructor
          margin={getMargin()}
          datasets={object('datasets', exampleDatasets)}
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
          data={{}}
        />
      )
    }

    return <Wrapper />
  })
