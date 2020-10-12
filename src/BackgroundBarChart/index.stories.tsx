import React from 'react'

import { boolean, number, object, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/_private/storybook'

import { aligns, BackgroundBarChart } from '.'
import { groups } from './data.mock'

const getCommonProps = (initialUnit: string) => {
  const unit = text('unit', initialUnit)

  return {
    groups: object('groups', groups),
    gridTicks: number('gridTicks', 4),
    valuesTicks: number('valuesTicks', 1),
    formatValueForTooltip: (v: number) => `${v} ${unit}`,
    unit,
    align: select('align', aligns, 'start'),
    isHorizontal: boolean('isHorizontal', true),
    showValues: boolean('showValues', false),
  } as const
}

export const Interactive = createStory(() => {
  return <BackgroundBarChart {...getCommonProps('тыс. м³')} />
})

export default createMetadata({
  title: 'components/BackgroundBarChart',
  decorators: [environmentDecorator()],
  parameters: {
    environment: {
      style: {
        width: '40vw',
      },
    },
  },
})
