import React from 'react'

import { object } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import {
  blockCenteringDecorator,
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  emptyFormatValue,
} from '@/utils/Storybook'

import { DonutChart } from '.'

const dataItemWithoutData = {
  data: {
    name: 'Неизвестный бур',
    colorGroupName: 'forth',
    sections: [{ value: null }, { value: null }, { value: null }],
  },
  colorGroup: {
    forth: 'var(--color-bg-alert)',
  },
}

const zeroValue = { value: 0 }
const sectionWithOnlyZeroData = [...times(3, () => zeroValue)] as const

const dataItemsWithZeroData = [
  {
    name: 'Первый нулевой бур',
    colorGroupName: 'first',
    sections: sectionWithOnlyZeroData,
  },
  {
    name: 'Второй нулевой бур',
    colorGroupName: 'second',
    sections: sectionWithOnlyZeroData,
  },
  {
    name: 'Третий нулевой бур',
    colorGroupName: 'third',
    sections: sectionWithOnlyZeroData,
  },
] as const

const dataItemsWithZeroAndPositiveData = [
  {
    ...dataItemsWithZeroData[0],
    name: 'Первый околонулевой бур',
    sections: [zeroValue, { value: 10 }, zeroValue],
  },
  dataItemsWithZeroData[1],
  dataItemsWithZeroData[2],
] as const

export const progressDonutData = {
  data: [
    {
      name: 'План',
      colorGroupName: 'plan',
      sections: [{ value: 3, showValue: 60 }],
    },
    {
      name: 'Факт',
      colorGroupName: 'fact',
      sections: [{ value: 1, showValue: 15 }],
    },
  ],
  colorGroups: {
    plan: 'var(--color-bg-border)',
    fact: 'var(--color-bg-warning)',
  },
}

export const Interactive = createStory(
  () => {
    return (
      <DonutChart
        data={object('data', getWidgetMockData(DataType.Donut).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
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
        colorGroups={object('colorGroups', {
          ...getWidgetMockData(DataType.Donut).colorGroups,
        })}
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
        data={object('data', dataItemsWithZeroAndPositiveData)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
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
        data={object('data', dataItemsWithZeroData)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Donut).colorGroups)}
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
          ...getWidgetMockData(DataType.Donut).data,
          { ...dataItemWithoutData.data, sections: [{ value: null }, { value: 0 }, { value: 8 }] },
        ])}
        colorGroups={object('colorGroups', {
          ...getWidgetMockData(DataType.Donut).colorGroups,
          ...dataItemWithoutData.colorGroup,
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
        data={object('data', [
          ...getWidgetMockData(DataType.Donut).data,
          { ...dataItemWithoutData.data },
        ])}
        colorGroups={object('colorGroups', {
          ...getWidgetMockData(DataType.Donut).colorGroups,
          ...dataItemWithoutData.colorGroup,
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
        data={object('data', progressDonutData.data)}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
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
        data={object('data', progressDonutData.data)}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
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
          progressDonutData.data[0],
          { ...progressDonutData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={progressDonutData.colorGroups}
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
        data={object('data', progressDonutData.data)}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
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
          { ...progressDonutData.data[0], sections: [{ ...zeroValue, showValue: 0 }] },
          { ...progressDonutData.data[1], sections: [{ ...zeroValue, showValue: 0 }] },
        ])}
        colorGroups={object('colorGroups', progressDonutData.colorGroups)}
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
          progressDonutData.data[0],
          { ...progressDonutData.data[1], sections: [{ value: null }] },
        ])}
        colorGroups={progressDonutData.colorGroups}
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
