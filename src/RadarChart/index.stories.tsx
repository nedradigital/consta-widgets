import React from 'react'

import { number, object, select, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'
import { getFormattedValue } from '@/common/utils/chart'

import { RadarChart } from './'
import { axesLabels, colorGroups, emptyFigures, figures } from './data.mock'

const formattersLabel = ['--', 'Как проценты'] as const
type FormatterLabelName = typeof formattersLabel[number]
type FormatterLabelValue = ((value: number | null) => string) | undefined

const formattersLabelList: Record<FormatterLabelName, FormatterLabelValue> = {
  '--': undefined,
  'Как проценты': value => getFormattedValue(value, v => `${Math.round(v)}%`),
}

const formattersTooltip = ['--', 'С единицей измерения'] as const
type FormatterTooltipName = typeof formattersTooltip[number]
type FormatterTooltipValue = (() => (value: number | null) => string) | undefined

const formattersTooltipList: Record<FormatterTooltipName, FormatterTooltipValue> = {
  '--': undefined,
  'С единицей измерения': () => {
    const unit = text('unit', ' тыс. м3')
    return value => getFormattedValue(value, v => `${v}${unit}`)
  },
}

const getColorGroups = () => object('colorGroups', colorGroups)

const getFormattersForLabel = () => {
  const selected = select('formatValueForLabel', formattersLabel, formattersLabel[0])
  return formattersLabelList[selected]
}

const getFormattersForTooltip = () => {
  const selected = select('formatValueForTooltip', formattersTooltip, formattersTooltip[0])
  const formatter = formattersTooltipList[selected]

  return formatter ? formatter() : undefined
}

const decorators = [
  withSmartKnobs({ ignoreProps: ['backgroundColor'] }),
  blockCenteringDecorator({ width: '80vw', height: '80vh' }),
] as const

export const TwoFigures = createStory(
  () => (
    <RadarChart
      colorGroups={getColorGroups()}
      axesLabels={object('axesLabels', axesLabels)}
      maxValue={10}
      figures={figures}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattersForLabel()}
      formatValueForTooltip={getFormattersForTooltip()}
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
      axesLabels={object('axesLabels', axesLabels)}
      maxValue={10}
      figures={emptyFigures}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattersForLabel()}
      formatValueForTooltip={getFormattersForTooltip()}
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
      axesLabels={object('axesLabels', axesLabels)}
      maxValue={10}
      figures={figures.slice(0, 1)}
      ticks={4}
      backgroundColor="var(--color-bg-default)"
      formatValueForLabel={getFormattersForLabel()}
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
      axesLabels={object('axesLabels', axesLabels)}
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
      axesLabels={object('axesLabels', axesLabels)}
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
