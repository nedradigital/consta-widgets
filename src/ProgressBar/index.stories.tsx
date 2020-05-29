import React from 'react'

import { object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'

import { ProgressBar } from './'
import { convertItemToDataItem, progressBarData, progressBarDataWithNullValue } from './data.mock'

export const Interactive = createStory(() => {
  const data = object('data', progressBarData.data).map(convertItemToDataItem)

  return (
    <ProgressBar
      data={data}
      colorGroups={object('colorGroups', progressBarData.colorGroups)}
      size="m"
    />
  )
})

export const WithoutData = createStory(
  () => {
    const data = object('data', progressBarDataWithNullValue.data).map(convertItemToDataItem)

    return (
      <ProgressBar
        data={data}
        colorGroups={object('colorGroups', progressBarDataWithNullValue.colorGroups)}
        size="m"
      />
    )
  },
  {
    name: 'без данных',
  }
)

export default createMetadata({
  title: 'components/ProgressBar',
  decorators: [
    withSmartKnobs({ ignoreProps: ['data'] }),
    blockCenteringDecorator({ width: 300, height: 300 }),
  ],
})
