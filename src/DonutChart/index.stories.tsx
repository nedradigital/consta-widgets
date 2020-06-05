import React from 'react'

import { object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import {
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  emptyFormatValue,
  environmentDecorator,
} from '@/common/storybook'

import { DonutChart } from '.'
import {
  donutData,
  donutDataItemsWithZeroAndPositiveData,
  donutDataItemsWithZeroData,
  donutDataItemWithoutData,
  donutProgressData,
  zeroValue,
} from './data.mock'

export const Interactive = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutData.data)}
        colorGroups={object('colorGroups', donutData.colorGroups)}
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
            colorGroupName: 'first',
            sections: [zeroValue],
          },
        ])}
        colorGroups={object('colorGroups', donutData.colorGroups)}
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
        colorGroups={object('colorGroups', donutDataItemsWithZeroAndPositiveData.colorGroups)}
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
        colorGroups={object('colorGroups', donutDataItemsWithZeroData.colorGroups)}
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
            sections: [{ value: null }, { value: 0 }, { value: 8 }],
          },
        ])}
        colorGroups={object('colorGroups', {
          ...donutData.colorGroups,
          ...donutDataItemWithoutData.colorGroup,
        })}
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
        colorGroups={object('colorGroups', {
          ...donutData.colorGroups,
          ...donutDataItemWithoutData.colorGroup,
        })}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'без данных по одной группе целиком' }
)

export const LikeProgressBar = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutProgressData.data)}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
      />
    )
  },
  { name: 'Как прогресс бар' }
)

export const LikeProgressBarWithText = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutProgressData.data)}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
        textData={object('textData', {
          value: '15%',
        })}
      />
    )
  },
  { name: 'Как прогресс бар с текстом внутри' }
)

export const LikeProgressBarWithoutFacts = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          donutProgressData.data[0],
          { ...donutProgressData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
      />
    )
  },
  { name: 'Как прогресс бар без данных по факту' }
)

export const HalfDonut = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', donutProgressData.data)}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
        halfDonut="right"
        textData={object('textData', {
          title: 'всего',
          value: '90',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  },
  { name: 'Как полукруг с текстом' }
)

export const HalfDonutWithZeroData = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          { ...donutProgressData.data[0], sections: [{ ...zeroValue, showValue: 0 }] },
          { ...donutProgressData.data[1], sections: [{ ...zeroValue, showValue: 0 }] },
        ])}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
        halfDonut="right"
        textData={object('textData', {
          title: 'всего',
          value: '0',
          subTitle: 'МГРП',
          subValue: '0',
        })}
      />
    )
  },
  { name: 'Как полукруг с текстом и нулевыми данными' }
)

export const HalfDonutWithoutFacts = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', [
          donutProgressData.data[0],
          { ...donutProgressData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={object('colorGroups', donutProgressData.colorGroups)}
        formatValueForTooltip={emptyFormatValue}
        halfDonut="right"
        textData={object('textData', {
          title: 'всего',
          value: '90',
          subTitle: 'МГРП',
          subValue: '20',
        })}
      />
    )
  },
  { name: 'Как полукруг с текстом без данных по факту' }
)

export default createMetadata({
  title: 'components/DonutChart',
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
  excludeStories: ['progressDonutData'],
})
