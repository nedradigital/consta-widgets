import * as React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { Dataset, DataType } from '@/dashboard/types'

import { Constructor, DashboardState } from './'
import { Config } from './components/Dashboard'

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
const cols = 4

const storageName = 'story::dashboard'

const getStateFromStorage = (): DashboardState => {
  const str = localStorage.getItem(storageName)

  if (str) {
    return JSON.parse(str)
  }

  return {
    boxes: [],
    config: {},
  }
}

const setStateToStorage = (value: DashboardState | Config) => {
  localStorage.setItem(storageName, JSON.stringify(value))
}

storiesOf('dashboard/Constructor', module)
  .addDecorator(withSmartKnobs)
  .add('default constructor', () => {
    return (
      <Constructor
        viewMode={false}
        margin={getMargin()}
        datasets={exampleDatasets}
        cols={cols}
        dashboard={{ boxes: [], config: {} }}
        data={{}}
        onChange={() => {
          /**/
        }}
      />
    )
  })
  .add('with state', () => {
    function Wrapper() {
      const [dashboard, setDashboard] = React.useState<DashboardState>(getStateFromStorage())
      const [viewMode, setViewMode] = React.useState(false)

      const handler = (data: DashboardState) => {
        setDashboard(data)
        setStateToStorage(data)
      }

      return (
        <Constructor
          margin={getMargin()}
          datasets={object('datasets', exampleDatasets)}
          cols={object('cols', cols)}
          dashboard={dashboard}
          onChange={handler}
          onClear={() => {
            localStorage.removeItem(storageName)
            location.reload()
          }}
          onToggleMode={() => setViewMode(!viewMode)}
          viewMode={viewMode}
          data={{}}
        />
      )
    }

    return <Wrapper />
  })
