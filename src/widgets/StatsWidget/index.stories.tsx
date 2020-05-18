import React from 'react'

import { Preview, Props } from '@storybook/addon-docs/blocks'
import { object } from '@storybook/addon-knobs'

import { Stats } from '@/components/Stats'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { defaultParams, StatsWidget, StatsWidgetContent } from '.'
import page from './docs.mdx'

export const Interactive = createStory(() => (
  <StatsWidgetContent
    data={object('data', StatsWidget.mockData)}
    params={object('params', defaultParams)}
  />
))

export const PreviewWrapper = () => (
  <Preview>
    <Interactive />
  </Preview>
)
export const PropsPreview = () => <Props of={Stats} />

export default createMetadata({
  title: 'widgets/StatsWidget',
  decorators: [blockCenteringDecorator()],
  includeStories: ['Interactive'],
  parameters: {
    docs: {
      page,
    },
  },
})
