import React from 'react'

import { Example } from '@/_private/storybook'

import { TornadoChart } from '../..'
import { interactiveData } from '../../data.mock'

export const TornadoChartExample = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="left"
      size="m"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      formatValueForTooltip={v => `${v} км`}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="both"
    />
  </Example>
)

export const TornadoChartExampleGroup = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  </Example>
)

export const TornadoChartExampleShowValues = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
      showValues
    />
  </Example>
)

export const TornadoChartExampleTooltip = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
      formatValueForTooltip={v => `${v} млн руб.`}
    />
  </Example>
)

export const TornadoChartExampleGrid = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={2}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
      formatValueForTooltip={v => `${v} млн руб.`}
    />
  </Example>
)

export const TornadoChartExampleGrid2 = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={10}
      valuesTicks={2}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
      formatValueForTooltip={v => `${v} млн руб.`}
    />
  </Example>
)

export const TornadoChartExampleFormat = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
      formatValueForLabel={v => `${v}%`}
    />
  </Example>
)

export const TornadoChartExampleSizeS = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="none"
      yAxisShowPosition="none"
      formatValueForLabel={v => `${v}%`}
    />
  </Example>
)

export const TornadoChartExampleSizeM = () => (
  <Example>
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="m"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="none"
      yAxisShowPosition="none"
      formatValueForLabel={v => `${v}%`}
    />
  </Example>
)

export const TornadoChartExampleUnitLeft = () => (
  <Example width="300px">
    <TornadoChart
      unit="млн руб."
      unitPosition="left"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  </Example>
)

export const TornadoChartExampleUnitBottom = () => (
  <Example width="300px">
    <TornadoChart
      unit="млн руб."
      unitPosition="bottom"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  </Example>
)

export const TornadoChartExampleUnitLeftBottom = () => (
  <Example width="300px">
    <TornadoChart
      unit="млн руб."
      unitPosition="left-and-bottom"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  </Example>
)

export const TornadoChartExampleUnitNone = () => (
  <Example width="300px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="left"
    />
  </Example>
)

export const TornadoChartExampleXPosTop = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="top"
      yAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleXPosBottom = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="bottom"
      yAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleXPosBoth = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="both"
      yAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleXPosNone = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      xAxisShowPosition="none"
      yAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleYPosLeft = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      yAxisShowPosition="left"
      xAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleYPosRight = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      yAxisShowPosition="right"
      xAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleYPosBoth = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      yAxisShowPosition="both"
      xAxisShowPosition="none"
    />
  </Example>
)

export const TornadoChartExampleYPosNone = () => (
  <Example width="325px">
    <TornadoChart
      unit="млн руб."
      unitPosition="none"
      size="s"
      colors={interactiveData.colors}
      groups={interactiveData.groups}
      gridTicks={5}
      valuesTicks={1}
      yAxisShowPosition="none"
      xAxisShowPosition="none"
    />
  </Example>
)
