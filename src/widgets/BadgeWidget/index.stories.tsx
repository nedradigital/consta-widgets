import React from 'react'

import { Preview } from '@storybook/addon-docs/blocks'
import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { BadgeWidget, BadgeWidgetContent, defaultParams } from '.'
import page from './docs.mdx'

export const Interactive = createStory(() => (
  <BadgeWidgetContent
    data={object('data', BadgeWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export const PreviewWrapper = () => (
  <Preview>
    <Interactive />
    <BadgeWidgetContent
      data={object('data', BadgeWidget.mockData)}
      params={{
        size: 's',
        view: 'filled',
        form: 'round',
      }}
    />
    <BadgeWidgetContent
      data={object('data', BadgeWidget.mockData)}
      params={{
        size: 's',
        view: 'filled',
        isMinified: true,
      }}
    />
  </Preview>
)

export default createMetadata({
  title: 'widgets/BadgeWidget',
  decorators: [blockCenteringDecorator()],
  includeStories: ['Interactive'],
  parameters: { docs: { page } },
})
