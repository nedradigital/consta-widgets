import { object, select } from '@storybook/addon-knobs'
import { zipObject } from 'lodash'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { halvesDonut } from '@/core/DonutChart/components/Donut'
import { Colors, ProgressDonut } from '@/ProgressDonut'

const halvesDonutList = zipObject(['--', ...halvesDonut], [undefined, ...halvesDonut])

const title = 'факт/план ПП'

const data = {
  value: 30,
  valueMin: 0,
  valueMax: 100,
}

const colors: Colors = ['var(--color-bg-normal)', 'var(--color-bg-success)']

export const Interactive = createStory(
  () => (
    <ProgressDonut
      title={title}
      data={object('data', data)}
      colors={object('colors', colors)}
      halfDonut={select('halfDonut', halvesDonutList, undefined)}
    />
  ),
  { name: 'стандартный' }
)

export const WithText = createStory(
  () => (
    <ProgressDonut
      title={title}
      data={object('data', data)}
      colors={object('colors', colors)}
      halfDonut={select('halfDonut', halvesDonutList, undefined)}
      showText
    />
  ),
  {
    name: 'со значением',
  }
)

export const WithTitle = createStory(
  () => (
    <ProgressDonut
      title={title}
      data={object('data', data)}
      colors={object('colors', colors)}
      halfDonut={select('halfDonut', halvesDonutList, undefined)}
      showText
      showTitle
    />
  ),
  { name: 'с подписью' }
)

export const WithoutData = createStory(
  () => (
    <ProgressDonut
      title={title}
      data={object('data', { valuePlaceholder: '--' })}
      colors={object('colors', colors)}
      showText
    />
  ),
  {
    name: 'без данных',
  }
)

export const WithMoreThan100 = createStory(
  () => (
    <ProgressDonut
      title={title}
      data={object('data', { value: 120 })}
      colors={object('colors', colors)}
    />
  ),
  { name: 'с более 100%' }
)

export default createMetadata({
  title: 'components/ProgressDonut',

  decorators: [
    withSmartKnobs(),
    environmentDecorator({
      style: {
        backgroundColor: 'var(--color-control-bg-default)',
        width: 200,
        height: 200,
      },
    }),
  ],
})
