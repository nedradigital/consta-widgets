import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechParamsBlockWithChart } from '.'

const loLimit = -10
const hiLimit = 10
const mainData = {
  unit: 'тс',
  description: 'Вес на крюке',
  loLimit: -10,
  loBound: -5,
  hiBound: 5,
  hiLimit: 10,
  defaultLoBound: 0,
  defaultHiBound: 0,
  data: Array.from({ length: 3600 }, (_, index) => {
    let span = (hiLimit - loLimit) / 8
    const offset = Math.random() * Math.PI

    if (Math.random() < 0.01) {
      span = span * 6
    } else if (Math.random() < 0.05) {
      span = span * 4
    } else if (Math.random() < 0.1) {
      span = span * 3
    }

    return (
      Math.cos(index / 200 + offset) * span +
      (Math.random() * span - span / 2) +
      loLimit +
      (hiLimit - loLimit) / 2
    )
  }),
}
const additionalData = {
  unit: 'м',
  description: 'Полож. блока',
  loBound: null,
  hiBound: null,
  loLimit: null,
  hiLimit: null,
  data: Array.from({ length: 3600 }, (_, index) => Math.sin(index / 200)),
}

const dataRange = {
  lowerDanger: -7.9,
  lowerWarning: -7.9,
  maximum: 159,
  minimum: -7.9,
  upperDanger: 159,
  upperWarning: 159,
  originalLowerDanger: 0,
  originalLowerWarning: 0,
  originalUpperWarning: 0,
  originalUpperDanger: 0,
}

storiesOf('legacy/TechParams/BlockWithChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ display: 'flex', height: '90vh', width: 161 }))
  .add('interactive', () => (
    <TechParamsBlockWithChart
      mainData={mainData}
      additionalData={additionalData}
      dataRange={dataRange}
      state="Обсажен"
    />
  ))
