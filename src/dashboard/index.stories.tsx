import * as React from 'react'

import { boolean, number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Dataset, DataType } from '@/dashboard/types'

import { Constructor, DashboardState, EMPTY_DASHBOARD } from './'

const getPadding = () => [number('padding x', 15), number('padding y', 15)] as const
const getRowsCount = () => number('rowsCount', 4)

export const exampleDatasets: readonly Dataset[] = [
  {
    name: 'Работа скважины',
    type: DataType.LinearChart,
    id: 'skvazhina',
  },
  {
    name: 'Месторождение',
    type: DataType.TableLegend,
    id: 'field',
  },
  {
    name: 'Пример переключателя',
    type: DataType.Switch,
    id: 'switchExample',
  },
]
const cols = 12

const storageName = 'story::dashboard'

const viewMode = false

const getStateFromStorage = (): DashboardState => {
  const str = localStorage.getItem(storageName)

  if (str) {
    return JSON.parse(str)
  }

  return EMPTY_DASHBOARD
}

const setStateToStorage = (value: DashboardState) => {
  localStorage.setItem(storageName, JSON.stringify(value))
}

const DashboardStory = () => {
  const [dashboard, setDashboard] = React.useState<DashboardState>(EMPTY_DASHBOARD)

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
        onChangeVersion={handler}
        onClear={() => {
          localStorage.removeItem(storageName)
          location.reload()
        }}
        viewMode={boolean('viewMode', viewMode)}
        data={object('data', {})}
        baseWidthForScaling={number('baseWidthForScaling', 1024)}
        baseHeightForScaling={number('baseHeightForScaling', 768)}
        baseFontSize={number('baseFontSize', 16)}
        basePadding={getPadding()}
        rowsCount={getRowsCount()}
      />
    </div>
  )
}

storiesOf('dashboard/Constructor', module)
  .addDecorator(withSmartKnobs())
  .add('с сохранением состояния', () => <DashboardStory />)
