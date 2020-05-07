import React from 'react'

import { number, object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { Roadmap } from '.'
import { minimalData, monochromeData } from './mockData'

export const Interactive = createStory(() => {
  const {
    data: { titles, rows, currentDay, startDate, endDate, filters },
    colorGroups,
  } = getWidgetMockData(DataType.Roadmap)[0]

  return (
    <Roadmap
      rows={object('rows', rows)}
      currentDay={number('currentDay', currentDay)}
      titles={object('titles', titles)}
      colorGroups={object('colorGroups', colorGroups)}
      filters={object('filters', filters)}
      startDate={startDate}
      endDate={endDate}
    />
  )
})

export const WithLittleData = createStory(
  () => {
    const { colorGroups } = getWidgetMockData(DataType.Roadmap)[0]
    const { titles, currentDay, rows, startDate, endDate, filters } = minimalData

    return (
      <Roadmap
        rows={object('rows', rows)}
        currentDay={number('currentDay', currentDay)}
        titles={object('titles', titles)}
        colorGroups={object('colorGroups', colorGroups)}
        filters={object('filters', filters)}
        startDate={startDate}
        endDate={endDate}
      />
    )
  },
  { name: 'с малым количеством данных' }
)

export const SingleColor = createStory(
  () => {
    const { titles, currentDay, rows, startDate, endDate, filters } = monochromeData

    return (
      <Roadmap
        rows={object('rows', rows)}
        currentDay={currentDay}
        titles={object('titles', titles)}
        colorGroups={object('colorGroups', {
          green: 'var(--color-bg-success)',
        })}
        filters={object('filters', filters)}
        startDate={startDate}
        endDate={endDate}
      />
    )
  },
  { name: 'одноцветный' }
)

export default createMetadata({
  title: 'components/Roadmap',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: '80vw' })],
})
