import React from 'react'

import { object, select } from '@storybook/addon-knobs'
import { zipObject } from 'lodash'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import {
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  emptyFormatValue,
  environmentDecorator,
} from '@/common/storybook'
import { HalfDonut, halvesDonut } from '@/core/DonutChart/components/Donut'

import { DonutChart } from '.'
import {
  donutData,
  donutDataItemsWithZeroAndPositiveData,
  donutDataItemsWithZeroData,
  donutDataItemWithoutData,
  donutProgressData,
} from './data.mock'

const halvesDonutList = zipObject(['--', ...halvesDonut], [undefined, ...halvesDonut])

const halfDonutSelect = (value?: HalfDonut) => select('halfDonut', halvesDonutList, value)

export const Interactive = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutData.data)}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'стандартный' }
)

export const WithZeroDataInOneGroup = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          {
            name: 'Нулевой бур',
            color: 'var(--color-bg-alert)',
            values: [0],
          },
        ])}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'с нулевыми данными по единственной группе' }
)

export const WithZeroDataInSomeGroups = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutDataItemsWithZeroAndPositiveData.data)}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'с нулевыми данными не по всем группам' }
)

export const WithZeroDataInAllGroups = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutDataItemsWithZeroData.data)}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'с нулевыми данными по всем группам' }
)

export const WithoutDataForOneGroup = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          ...donutData.data,
          {
            ...donutDataItemWithoutData.data,
            values: [null, 0, 8],
          },
        ])}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'без данных по одной группе в одном круге' }
)

export const WithouDataForOneGroupAsWhole = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [...donutData.data, { ...donutDataItemWithoutData.data }])}
        halfDonut={halfDonutSelect()}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'без данных по одной группе целиком' }
)

export const AsHalfDonut = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutProgressData.data)}
        formatValueForTooltip={emptyFormatValue}
        halfDonut={halfDonutSelect('right')}
        textData={object('textData', {
          title: 'всего',
          value: '90',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  },
  { name: 'как полукруг с текстом' }
)

export const AsHalfDonutWithZeroData = createStory(
  () => {
    return (
      <DonutChart
        data={object(
          'data',
          donutProgressData.data.map(item => ({
            ...item,
            values: [0],
          }))
        )}
        formatValueForTooltip={emptyFormatValue}
        halfDonut={halfDonutSelect('right')}
        textData={object('textData', {
          title: 'всего',
          value: '0',
          subTitle: 'МГРП',
          subValue: '0',
        })}
      />
    )
  },
  { name: 'как полукруг с текстом и нулевыми данными' }
)

export const AsHalfDonutWithoutFacts = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          donutProgressData.data[0],
          { ...donutProgressData.data[1], values: [null] },
          donutProgressData.data[2],
        ])}
        formatValueForTooltip={emptyFormatValue}
        halfDonut={halfDonutSelect('right')}
        textData={object('textData', {
          title: 'всего',
          value: '70',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  },
  { name: 'как полукруг с текстом без данных по одной из скважин' }
)

export default createMetadata({
  title: 'components/DonutChart',
  decorators: [
    withSmartKnobs(),
    environmentDecorator({
      style: {
        width: 200,
        height: 200,
      },
    }),
  ],
  excludeStories: ['progressDonutData'],
})
