import { object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/common/storybook'
import { unitPositions } from '@/core/BarChart'

import { BarChart } from './'
import { minimalData, withNegativeValueData, withThreeColumnsData } from './data.mock'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

export const WithThreeColumns = createStory(
  () => (
    <BarChart
      colors={object('colors', withThreeColumnsData.colors)}
      unit={withThreeColumnsData.unit}
      unitPosition={getUnitPosition()}
      size="m"
      gridTicks={5}
      valuesTicks={1}
      groups={withThreeColumnsData.groups}
    />
  ),
  { name: 'с группами по три столбца' }
)

export const WithNegativeValue = createStory(
  () => (
    <BarChart
      colors={object('colors', withNegativeValueData.colors)}
      unit={withNegativeValueData.unit}
      unitPosition={getUnitPosition()}
      size="m"
      gridTicks={5}
      valuesTicks={1}
      groups={withNegativeValueData.groups}
      isHorizontal={true}
      showValues={true}
    />
  ),
  { name: 'с отрицательными значениями' }
)

export const WithShowValuesOnTopBar = createStory(
  () => (
    <BarChart
      colors={object('colors', minimalData.colors)}
      unit={minimalData.unit}
      unitPosition={getUnitPosition()}
      size="auto"
      gridTicks={5}
      valuesTicks={1}
      groups={minimalData.groups}
      isHorizontal={false}
      showValues={true}
    />
  ),
  { name: 'с подписью над столбцами' }
)

export const Minimalistic = createStory(
  () => (
    <BarChart
      colors={object('colors', minimalData.colors)}
      unit={minimalData.unit}
      unitPosition={getUnitPosition()}
      size="m"
      gridTicks={0}
      valuesTicks={0}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={false}
    />
  ),
  { name: 'минималистичный' }
)

export default createMetadata({
  title: 'components/BarChart',
  decorators: [withSmartKnobs()],
  parameters: {
    environment: {
      style: {
        width: '60vw',
        height: '80vh',
      },
    },
  },
})
