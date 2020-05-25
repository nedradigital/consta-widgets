import React from 'react'

import { getArrayWithRandomInt } from '@csssr/gpn-utils/lib/array'
import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import { Text } from '@gpn-design/uikit'
import { number, object, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/utils/Storybook'

import { LinearChart } from '.'

const MIN = -2
const MAX = 8
const COUNT_POINTS = 51

const colorGroups = {
  first: 'var(--color-bg-success)',
  second: 'var(--color-bg-normal)',
}

const getGridConfig = () =>
  object('gridConfig', {
    x: {
      labels: 'bottom',
      labelTicks: 1,
      gridTicks: 10,
      guide: true,
      withPaddings: false,
    },
    y: {
      labels: 'left',
      labelTicks: 1,
      gridTicks: 4,
      guide: true,
      withPaddings: false,
    },
  } as const)

const getCommonProps = () => {
  const now = Date.now()
  const unit = text('unit', 'тыс м3')
  const valueMapper = (y: number, x: number) => ({
    x: now + x * 1000 * 60 * 60 * 24,
    y,
  })

  return {
    lines: [
      {
        colorGroupName: 'first',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS - 1).map(valueMapper),
        dots: true,
        lineName: 'Северный бур',
        withGradient: true,
      },
      {
        colorGroupName: 'second',
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map(valueMapper),
        lineName: 'Южное месторождение',
      },
    ],
    threshold: object('threshold', {
      max: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(6, x)),
      },
      min: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(1, x)),
      },
    }),
    gridConfig: getGridConfig(),
    withZoom: true,
    formatValueForLabel: (v: number) => new Date(v).toLocaleDateString(),
    foematValueForTooltip: (v: number) => `${v} ${unit}`,
    formatValueForTooltipTitle: (v: number) => {
      const title = new Date(v)
        .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
        .replace('г.', '')

      return title[0].toUpperCase() + title.slice(1)
    },
    unit,
  }
}

const decorators = [
  withSmartKnobs(),
  blockCenteringDecorator({ width: '60vw', height: '50vh' }),
] as const

export const Horizontal = createStory(
  () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal
      />
    )
  },
  { name: 'горизонтальный', decorators }
)

export const WithNullData = createStory(
  () => {
    return (
      <LinearChart
        colorGroups={colorGroups}
        lines={[
          {
            colorGroupName: 'first',
            values: [
              { x: 0, y: null },
              { x: 1, y: 1 },
              { x: 2, y: 0 },
              { x: 3, y: null },
              { x: 4, y: null },
              { x: 5, y: 3 },
              { x: 6, y: null },
              { x: 7, y: 1 },
              { x: 8, y: 2 },
              { x: 9, y: null },
            ],
            dots: true,
            lineName: 'Северный бур',
            withGradient: true,
          },
        ]}
        gridConfig={getGridConfig()}
        formatValueForLabel={String}
        isHorizontal
        withZoom
      />
    )
  },
  { name: 'с пропусками', decorators }
)

export const WithClickHandler = createStory(
  () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal
        onClickHoverLine={value => alert(new Date(value))}
      />
    )
  },
  { name: 'с обработкой клика', decorators }
)

const ExampleTitle = (
  <Text tag="div" view="primary" size="m">
    LTIF
  </Text>
)

export const WithTitle = createStory(
  () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal
        title={ExampleTitle}
      />
    )
  },
  { name: 'с заголовком', decorators }
)

export const WithNumbers = createStory(
  () => {
    const values: readonly any[] = [
      { x: 0, y: -1 },
      { x: 1, y: 3 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]
    const thresholdMin = number('Порог: нижняя грань', -1)
    const thresholdMax = number('Порог: верхняя грань', 4)

    return (
      <LinearChart
        colorGroups={{ first: 'var(--color-bg-success)', second: 'var(--color-bg-normal)' }}
        lines={[
          {
            colorGroupName: 'first',
            values,
            dots: true,
            lineName: 'Северный бур',
            withGradient: true,
          },
          {
            colorGroupName: 'second',
            values: [
              { x: 0, y: -2 },
              { x: 1, y: 4 },
              { x: 2, y: 0 },
              { x: 3, y: 5 },
            ],
            lineName: 'Южное месторождение',
          },
        ]}
        gridConfig={getGridConfig()}
        threshold={
          isNotNil(thresholdMax)
            ? {
                max: {
                  values: values.map(({ x }) => ({ x, y: thresholdMax })),
                },
                min: isNotNil(thresholdMin)
                  ? {
                      values: values.map(({ x }) => ({ x, y: thresholdMin })),
                    }
                  : undefined,
              }
            : undefined
        }
        isHorizontal
      />
    )
  },
  { name: 'с числами по x', decorators }
)

export const Vertical = createStory(
  () => {
    return (
      <LinearChart
        {...getCommonProps()}
        colorGroups={object('colorGroups', colorGroups)}
        isHorizontal={false}
      />
    )
  },
  {
    name: 'вертикальный',
    decorators: [withSmartKnobs(), blockCenteringDecorator({ width: 300, height: '80vh' })],
  }
)

export default createMetadata({
  title: 'components/LinearChart',
})
