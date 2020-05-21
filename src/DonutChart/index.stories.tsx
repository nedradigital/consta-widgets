import React from 'react'

import { object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import {
  blockCenteringDecorator,
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  emptyFormatValue,
} from '@/common/utils/Storybook'

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
    return <DonutChart {...donutData} formatValueForTooltip={cubeMeterFormatValue} />
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
        colorGroups={donutData.colorGroups}
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
        {...donutDataItemsWithZeroAndPositiveData}
        formatValueForTooltip={cubeMeterFormatValue}
      />
    )
  },
  { name: 'с нулевыми данными не по всем группам' }
)

export const WithZeroDataInAllGroups = createStory(
  () => {
    return (
      <DonutChart {...donutDataItemsWithZeroData} formatValueForTooltip={cubeMeterFormatValue} />
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
    return <DonutChart {...donutProgressData} formatValueForTooltip={emptyFormatValue} />
  },
  { name: 'Как прогресс бар' }
)

export const LikeProgressBarWithText = createStory(
  () => {
    return (
      <DonutChart
        {...donutProgressData}
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
        colorGroups={donutProgressData.colorGroups}
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
        {...donutProgressData}
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
        colorGroups={donutProgressData.colorGroups}
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
        colorGroups={donutProgressData.colorGroups}
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
    blockCenteringDecorator({
      backgroundColor: 'var(--color-control-bg-default)',
      width: 200,
      height: 200,
    }),
  ],
  excludeStories: ['progressDonutData'],
})
