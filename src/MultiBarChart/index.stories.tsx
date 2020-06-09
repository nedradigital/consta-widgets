import { object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'
import { unitPositions } from '@/core/BarChart'

import { MultiBarChart } from './'
import { interactiveData, withTwoColumnsData } from './data.mock'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

export const Interactive = createStory(
  () => (
    <MultiBarChart
      colorGroups={object('colorGroups', interactiveData.colorGroups)}
      groups={interactiveData.groups}
      unit={interactiveData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={4}
      valuesTicks={1}
      hasRatio={false}
      isHorizontal={false}
    />
  ),
  { name: 'с одним столбцом' }
)

export const WithTwoColumns = createStory(
  () => (
    <MultiBarChart
      colorGroups={object('colorGroups', withTwoColumnsData.colorGroups)}
      groups={withTwoColumnsData.groups}
      unit={withTwoColumnsData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={4}
      valuesTicks={1}
      hasRatio={false}
      isHorizontal={false}
    />
  ),
  { name: 'с двумя столбцами' }
)

export const Minimalistic = createStory(
  () => (
    <MultiBarChart
      colorGroups={object('colorGroups', interactiveData.colorGroups)}
      groups={interactiveData.groups}
      unit={interactiveData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={0}
      valuesTicks={0}
      hasRatio={false}
      isHorizontal={true}
    />
  ),
  { name: 'минималистичный' }
)

export default createMetadata({
  title: 'components/MultiBarChart',
  decorators: [withSmartKnobs(), blockCenteringDecorator({ width: '60vw', height: '80vh' })],
})
