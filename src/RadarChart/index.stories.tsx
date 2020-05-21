import React from 'react'

import { boolean, number, object, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { getFormattedValue } from '@/common/utils/chart'
import { percentFormatValue } from '@/common/utils/Storybook'
import { blockCenteringDecorator, createMetadata, createStory } from '@/common/utils/Storybook'

import { Figure, RadarChart } from './'

const getColorGroups = () => {
  return object('colorGroups', {
    mainCharacter: 'var(--color-bg-success)',
    partyMember: 'var(--color-bg-normal)',
  })
}

const axesLabels = {
  strength: 'Сила сила сила сила сила сила сила сила сила сила сила сила сила',
  endurance: 'Выносливая выносливость',
  charisma: 'Харизма',
  intelligence: 'Гиперинтеллектуальный интеллект',
  agility: 'Ловкость',
  persistence: 'Упорство',
  mobility: 'Мобильность',
  speed: 'Скорость',
  profit: 'Прибыльность',
}

const figures: readonly Figure[] = [
  {
    colorGroupName: 'mainCharacter',
    name: 'Северный бур',
    values: [
      { axisName: 'strength', value: 10 },
      { axisName: 'endurance', value: 9 },
      { axisName: 'charisma', value: 2 },
      { axisName: 'intelligence', value: 1 },
      { axisName: 'agility', value: 3 },
      { axisName: 'persistence', value: 7 },
      { axisName: 'mobility', value: 5 },
      { axisName: 'speed', value: 2 },
      { axisName: 'profit', value: 8 },
    ],
  },
  {
    colorGroupName: 'partyMember',
    name: 'Южное месторождение',
    values: [
      { axisName: 'strength', value: 2 },
      { axisName: 'endurance', value: 4 },
      { axisName: 'charisma', value: 8 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: 2 },
      { axisName: 'persistence', value: 7 },
      { axisName: 'mobility', value: 1 },
      { axisName: 'speed', value: 3 },
      { axisName: 'profit', value: 3 },
    ],
  },
]

const emptyFigures: readonly Figure[] = [
  {
    colorGroupName: 'mainCharacter',
    name: 'Северный бур',
    values: [
      { axisName: 'strength', value: 5 },
      { axisName: 'endurance', value: 8 },
      { axisName: 'charisma', value: 4 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: null },
      { axisName: 'persistence', value: null },
      { axisName: 'mobility', value: 8 },
      { axisName: 'speed', value: 4 },
      { axisName: 'profit', value: 10 },
    ],
  },
  {
    colorGroupName: 'partyMember',
    name: 'Южное месторождение',
    values: [
      { axisName: 'strength', value: 10 },
      { axisName: 'endurance', value: 4 },
      { axisName: 'charisma', value: 8 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: 2 },
      { axisName: 'persistence', value: 6 },
      { axisName: 'mobility', value: null },
      { axisName: 'speed', value: 7 },
      { axisName: 'profit', value: 9 },
    ],
  },
]

const getFormattedValueForLabel = () => {
  const useFormatPercents = boolean('Форматировать подписи кругов как проценты', false)

  if (useFormatPercents) {
    return (value: number | null) =>
      getFormattedValue(value, v => percentFormatValue(Math.round(v)))
  }

  return undefined
}

const getFormattedValueForTooltip = () => {
  const unit = text('Юнит для значения в тултипе', ' тыс м3')

  return (value: number | null) => getFormattedValue(value, v => `${v}${unit}`)
}

const decorators = [
  withSmartKnobs({ ignoreProps: ['backgroundColor'] }),
  blockCenteringDecorator({ width: '80vw', height: '80vh' }),
] as const

export const TwoFigures = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattedValueForLabel()}
      formatValueForTooltip={getFormattedValueForTooltip()}
      withConcentricColor={false}
      labelSize="s"
    />
  ),
  { name: '2 фигуры', decorators }
)

export const TwoFiguresWithoutData = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={emptyFigures}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattedValueForLabel()}
      formatValueForTooltip={getFormattedValueForTooltip()}
      withConcentricColor={false}
      labelSize="s"
    />
  ),
  { name: '2 фигуры сплошные без данных по одной и двум осям', decorators }
)

export const OneWholeFigure = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures.slice(0, 1)}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattedValueForLabel()}
      withConcentricColor={false}
      labelSize="s"
    />
  ),
  { name: '1 фигура сплошная', decorators }
)

export const OneRainbowFigure = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures.slice(0, 1)}
      ticks={5}
      backgroundColor="var(--color-bg-default)"
      withConcentricColor
      labelSize="s"
    />
  ),
  { name: '1 фигура радугой', decorators }
)

export const OneRainbowFigureWithoutData = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={[emptyFigures[0]]}
      ticks={5}
      backgroundColor="var(--color-bg-default)"
      withConcentricColor
      labelSize="s"
    />
  ),
  { name: '1 фигура радугой без данных по двум осям', decorators }
)

export const FontSizeReduction = createStory(
  () => {
    const commonProps = {
      colorGroups: {},
      axesLabels,
      maxValue: 10,
      figures,
      ticks: 4,
      backgroundColor: 'var(--color-bg-default)',
      withConcentricColor: true,
      labelSize: 's',
    } as const

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: 'max-content',
          minWidth: '100%',
          height: '100%',
        }}
      >
        <div style={{ width: number('Ширина левого контейнера', 483) }}>
          <RadarChart {...commonProps} />
        </div>
        <div style={{ width: number('Ширина среднего контейнера', 407) }}>
          <RadarChart {...commonProps} />
        </div>
        <div style={{ width: number('Ширина правого контейнера', 320) }}>
          <RadarChart {...commonProps} />
        </div>
      </div>
    )
  },
  {
    name: 'уменьшение размера шрифта',
    decorators: [blockCenteringDecorator({ width: '100vw', height: '100vh' })],
  }
)

export default createMetadata({
  title: 'components/RadarChart',
})
