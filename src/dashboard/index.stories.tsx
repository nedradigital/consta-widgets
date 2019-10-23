import * as React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { Dataset, DataType } from '@/dashboard/types'

import { Constructor, DashboardState } from './'
import { Config } from './components/Dashboard'

const getPadding = () => [number('padding x', 15), number('padding y', 15)] as const
const getRowsCount = () => number('rowsCount', 4)

export const exampleDatasets: readonly Dataset[] = [
  {
    name: 'График добычи нефти',
    type: DataType.Chart2D,
    id: 'oil',
  },
  {
    name: 'Работа скважины',
    type: DataType.LinearChart,
    id: 'skvazhina',
    formatLabel: (v: number) => new Date(v).toLocaleDateString(),
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
  {
    name: 'Месторождение',
    type: DataType.TableLegend,
    id: 'field',
  },
]
const cols = 12

const storageName = 'story::dashboard'

const getStateFromStorage = (): DashboardState => {
  const str = localStorage.getItem(storageName)

  if (str) {
    return JSON.parse(str)
  }

  return {
    boxes: [],
    config: {},
    settings: {},
  }
}

const setStateToStorage = (value: DashboardState | Config) => {
  localStorage.setItem(storageName, JSON.stringify(value))
}

const INITIAL_VALUES: DashboardState = { boxes: [], config: {}, settings: {} }

storiesOf('dashboard/Constructor', module)
  .addDecorator(withSmartKnobs())
  .add('default constructor', () => {
    return (
      <Constructor
        viewMode={false}
        datasets={exampleDatasets}
        cols={cols}
        dashboard={INITIAL_VALUES}
        data={{}}
        onChange={() => {
          /**/
        }}
        baseFontSize={16}
        rowsCount={getRowsCount()}
      />
    )
  })
  .add('with state', () => {
    function Wrapper() {
      const [dashboard, setDashboard] = React.useState<DashboardState>(INITIAL_VALUES)
      const [viewMode, setViewMode] = React.useState(false)

      React.useEffect(() => {
        setDashboard(getStateFromStorage())
      }, [])

      const handler = (data: DashboardState) => {
        setDashboard(data)
        setStateToStorage(data)
      }

      return (
        <div style={{ height: '100vh' }}>
          <Constructor
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
            baseWidthForScaling={1024}
            baseHeightForScaling={768}
            baseFontSize={16}
            basePadding={getPadding()}
            rowsCount={getRowsCount()}
          />
        </div>
      )
    }

    return <Wrapper />
  })
