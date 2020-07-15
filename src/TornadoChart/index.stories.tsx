import { object, select } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { unitPositions } from '@/core/BarChart'

import { TornadoChart } from './'
import { interactiveData } from './data.mock'

const getUnitPosition = () => select('unitPosition', unitPositions, 'none')

export const Interactive = createStory(() => (
  <TornadoChart
    colors={object('colors', interactiveData.colors)}
    groups={interactiveData.groups}
    unit={interactiveData.unit}
    unitPosition={getUnitPosition()}
    gridTicks={5}
    valuesTicks={1}
    size="m"
    xAxisShowPosition="bottom"
    yAxisShowPosition="both"
  />
))

export const Minimalistic = createStory(
  () => (
    <TornadoChart
      colors={object('colors', interactiveData.colors)}
      groups={interactiveData.groups}
      unit={interactiveData.unit}
      unitPosition={getUnitPosition()}
      gridTicks={0}
      valuesTicks={0}
      size="m"
      xAxisShowPosition="none"
      yAxisShowPosition="left"
    />
  ),
  { name: 'минималистичный' }
)

export default createMetadata({
  title: 'components/TornadoChart',
  decorators: [
    withSmartKnobs(),
    environmentDecorator({ style: { width: '60vw', height: '80vh' } }),
  ],
})
