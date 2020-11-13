import React from 'react'

import { Example } from '@/_private/storybook'

import { ProgressBar } from '../..'
import {
  progressBarDataCaption,
  progressBarDataMin,
  progressBarDataTicks,
  progressBarDataWithNullValue,
} from '../../data.mock'

export const ProgressBarExample = () => (
  <Example width="300px" margin="l">
    <ProgressBar data={progressBarDataMin.data} size="s" />
  </Example>
)

export const ProgressBarExampleNull = () => (
  <Example width="300px" margin="l">
    <ProgressBar data={progressBarDataWithNullValue.data} size="s" />
  </Example>
)

export const ProgressBarExampleCaption = () => (
  <Example width="300px" margin="l">
    <ProgressBar data={progressBarDataCaption.data} size="s" />
  </Example>
)

export const ProgressBarExampleTicks = () => (
  <Example width="300px" margin="l">
    <ProgressBar data={progressBarDataTicks.data} size="s" />
  </Example>
)

export const ProgressBarExampleXS = () => (
  <Example margin="l">
    <ProgressBar data={progressBarDataMin.data} size="xs" />
  </Example>
)

export const ProgressBarExampleS = () => (
  <Example margin="l">
    <ProgressBar data={progressBarDataMin.data} size="s" />
  </Example>
)

export const ProgressBarExampleM = () => (
  <Example margin="l">
    <ProgressBar data={progressBarDataMin.data} size="m" />
  </Example>
)

export const ProgressBarExampleL = () => (
  <Example margin="l">
    <ProgressBar data={progressBarDataMin.data} size="l" />
  </Example>
)
