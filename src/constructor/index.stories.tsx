import * as React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { array, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { Constructor, DashboardState, DataType } from './'

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

storiesOf('components/Constructor', module)
  .addDecorator(withSmartKnobs)
  .add('default constructor', () => {
    return (
      <Constructor
        margin={margin}
        datasets={datasets}
        cols={cols}
        dashboard={{ widgets: [], layouts: {} }}
      />
    )
  })
  .add('with state', () => {
    function Wrapper() {
      const [dashboard, setDashboard] = React.useState<DashboardState>({
        widgets: [],
        layouts: {},
      })
      const [viewMode, setViewMode] = React.useState(false)

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
        />
      )
    }

    return <Wrapper />
  })
