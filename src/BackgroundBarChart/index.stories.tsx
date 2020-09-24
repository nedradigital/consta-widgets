import React from 'react'

import { boolean, number, object, select } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/_private/storybook'

import { aligns, BackgroundBarChart } from '.'
import { groups } from './data.mock'

export const Interactive = createStory(() => {
  return (
    <BackgroundBarChart
      groups={object('groups', groups)}
      gridTicks={number('gridTicks', 4)}
      valuesTicks={number('valuesTicks', 1)}
      isHorizontal={boolean('isHorizontal', true)}
      showValues={boolean('showValues', false)}
      align={select('align', aligns, 'start')}
    />
  )
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
