import { select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { unitPositions } from '@/_private/components/BarChart'
import { createMetadata, createStory } from '@/_private/storybook'

import { MultiBarChart } from './'
import { interactiveData, withPercentColumnsData, withTwoColumnsData } from './data.mock'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

export const Interactive = createStory(
  () => (
    <MultiBarChart
      groups={interactiveData.groups}
      unit={interactiveData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={4}
      valuesTicks={1}
      isHorizontal={false}
    />
  ),
  { name: 'с одним столбцом' }
)

export const WithTwoColumns = createStory(
  () => (
    <MultiBarChart
      groups={withTwoColumnsData.groups}
      unit={withTwoColumnsData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={4}
      valuesTicks={1}
      isHorizontal={false}
    />
  ),
  { name: 'с двумя столбцами' }
)

export const HasRatio = createStory(
  () => (
    <MultiBarChart
      groups={withPercentColumnsData.groups}
      unit={withTwoColumnsData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={4}
      valuesTicks={1}
      isHorizontal={false}
      formatValueForLabel={v => `${v}%`}
    />
  ),
  { name: 'в процентах' }
)

export const Minimalistic = createStory(
  () => (
    <MultiBarChart
      groups={interactiveData.groups}
      unit={interactiveData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={0}
      valuesTicks={0}
      isHorizontal={true}
    />
  ),
  { name: 'минималистичный' }
)

export default createMetadata({
  title: 'components/MultiBarChart',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: { style: { width: '60vw', height: '80vh' } },
  },
})
