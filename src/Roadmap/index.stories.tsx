import React from 'react'

import { object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/common/storybook'

import { Roadmap } from '.'
import { data, minimalData, monochromeData } from './data.mock'

export const Interactive = createStory(() => {
  const { columns, rows, currentDay, startDate, endDate, filters } = data

  return (
    <Roadmap
      rows={object('rows', rows)}
      columns={object('columns', columns)}
      filters={object('filters', filters)}
      startDate={startDate}
      currentDay={currentDay}
      endDate={endDate}
    />
  )
})

export const WithLittleData = createStory(
  () => {
    const { columns, currentDay, rows, startDate, endDate, filters } = minimalData

    return (
      <Roadmap
        rows={object('rows', rows)}
        columns={object('columns', columns)}
        filters={object('filters', filters)}
        startDate={startDate}
        currentDay={currentDay}
        endDate={endDate}
      />
    )
  },
  { name: 'с малым количеством данных' }
)

export const SingleColor = createStory(
  () => {
    const { columns, currentDay, rows, startDate, endDate, filters } = monochromeData

    return (
      <Roadmap
        rows={object('rows', rows)}
        columns={object('columns', columns)}
        filters={object('filters', filters)}
        startDate={startDate}
        currentDay={currentDay}
        endDate={endDate}
      />
    )
  },
  { name: 'одноцветный' }
)

export default createMetadata({
  title: 'components/Roadmap',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: {
      style: {
        width: '80vw',
      },
    },
  },
})
