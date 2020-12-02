import React from 'react'

import { Example } from '@/_private/storybook'

import { Roadmap } from '../..'
import { exampleData } from '../../data.mock'

export const RoadmapExample = () => (
  <Example>
    <Roadmap
      rows={exampleData.rows}
      columns={exampleData.columns}
      startDate={exampleData.startDate}
      currentDay={exampleData.currentDay}
      endDate={exampleData.endDate}
    />
  </Example>
)

export const RoadmapExampleFilters = () => (
  <Example>
    <Roadmap
      rows={exampleData.rows}
      columns={exampleData.columns}
      filters={exampleData.filters}
      startDate={exampleData.startDate}
      currentDay={exampleData.currentDay}
      endDate={exampleData.endDate}
    />
  </Example>
)
