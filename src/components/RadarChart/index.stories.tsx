import React from 'react'

import { boolean, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Figure, RadarChart } from './'

const getColorGroups = () => {
  return object('colorGroups', {
    mainCharacter: '#20B55F',
    partyMember: '#56B9F2',
  })
}

const axesLabels = {
  strength: 'Сила сила сила сила сила сила сила сила сила сила сила сила сила',
  endurance: 'Выносливая выносливость',
  charisma: 'Харизма',
  intelligence: 'Гиперинтеллектуальный интеллект',
  agility: 'Ловкость',
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
    ],
  },
]

const getFormatterValueForLabel = () => {
  const useFormatPercents = boolean('Форматировать подписи кругов как проценты', false)

  if (useFormatPercents) {
    return (v: number) => `${Math.round(v)}%`
  }

  return undefined
}

const getFormatterValueForTooltip = () => {
  const unit = text('Юнит для значения в тултипе', ' тыс м3')

  return (v: number) => `${v}${unit}`
}

storiesOf('components/RadarChart', module)
  .addDecorator(withSmartKnobs({ ignoreProps: ['backgroundColor'] }))
  .addDecorator(blockCenteringDecorator({ width: '80vw', height: '80vh' }))
  .add('2 фигуры', () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures}
      ticks={4}
      backgroundColor="var(--bg-color)"
      formatValueForLabel={getFormatterValueForLabel()}
      formatValueForTooltip={getFormatterValueForTooltip()}
      withConcentricColor={false}
      labelSize="s"
    />
  ))
  .add('1 фигура сплошная', () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures.slice(0, 1)}
      ticks={4}
      backgroundColor="var(--bg-color)"
      formatValueForLabel={getFormatterValueForLabel()}
      withConcentricColor={false}
      labelSize="s"
    />
  ))
  .add('1 фигура радугой', () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={axesLabels}
      maxValue={10}
      figures={figures.slice(0, 1)}
      ticks={5}
      backgroundColor="var(--bg-color)"
      withConcentricColor
      labelSize="s"
    />
  ))
