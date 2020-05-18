import * as React from 'react'

import { boolean, number, object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/utils/Storybook'

import { Constructor, DashboardState } from './'
import { exampleDashboardData, exampleDatasets, initialDashboardState } from './mockData'

const getPadding = () => [number('padding x', 15), number('padding y', 15)] as const
const getRowsCount = () => number('rowsCount', 4)

const cols = 12

export const storageName = 'story::dashboard'

const viewMode = false

export const handleClear = () => {
  localStorage.setItem(storageName, JSON.stringify(initialDashboardState))
  location.reload()
}

const getStateFromStorage = (): DashboardState => {
  const str = localStorage.getItem(storageName)

  if (str) {
    return JSON.parse(str)
  }

  return initialDashboardState
}

const setStateToStorage = (value: DashboardState) => {
  localStorage.setItem(storageName, JSON.stringify(value))
}

export const DashboardStory = createStory(
  () => {
    const [dashboard, setDashboard] = React.useState<DashboardState>(initialDashboardState)

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
          viewMode={boolean('viewMode', viewMode)}
          datasets={object('datasets', exampleDatasets)}
          dashboard={dashboard}
          onChange={handler}
          onChangeVersion={handler}
          onClear={handleClear}
          data={object('data', exampleDashboardData)}
          cols={object('cols', cols)}
          baseWidthForScaling={number('baseWidthForScaling', 1024)}
          baseHeightForScaling={number('baseHeightForScaling', 768)}
          baseFontSize={number('baseFontSize', 16)}
          basePadding={getPadding()}
          rowsCount={getRowsCount()}
        />
      </div>
    )
  },
  { name: 'с сохранением состояния' }
)

export default createMetadata({
  title: 'dashboard/Constructor',
  decorators: [withSmartKnobs()],
  includeStories: ['DashboardStory'],
})
