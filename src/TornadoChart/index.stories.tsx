import React from 'react'

import { object, select, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { unitPositions } from '@/_private/components/BarChart'
import { createMetadata, createStory } from '@/_private/storybook'

import { TornadoChart } from './'
import { interactiveData } from './data.mock'

const getCommonProps = () => {
  const unit = text('unit', interactiveData.unit)
  const unitPosition = select('unitPosition', unitPositions, 'none')
  const colors = object('colors', interactiveData.colors)

  return {
    unit,
    unitPosition,
    size: 'm',
    colors,
    groups: interactiveData.groups,
    formatValueForTooltip: (v: number) => `${v} ${unit}`,
  } as const
}

export const Interactive = createStory(() => (
  <TornadoChart
    {...getCommonProps()}
    gridTicks={5}
    valuesTicks={1}
    xAxisShowPosition="bottom"
    yAxisShowPosition="both"
  />
))

export const Minimalistic = createStory(
  () => (
    <TornadoChart
      {...getCommonProps()}
      gridTicks={0}
      valuesTicks={0}
      xAxisShowPosition="none"
      yAxisShowPosition="left"
    />
  ),
  { name: 'минималистичный' }
)

export default createMetadata({
  title: 'components/TornadoChart',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: { style: { width: '60vw', height: '80vh' } },
  },
})
