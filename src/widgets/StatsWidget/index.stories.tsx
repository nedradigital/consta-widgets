import React from 'react'

import { Preview, Props } from '@storybook/addon-docs/blocks'
import { object } from '@storybook/addon-knobs'

import { Stats } from '@/components/Stats'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, StatsWidget, StatsWidgetContent } from '.'
import page from './docs.mdx'

export default {
  title: 'widgets/StatsWidget',
  decorators: [blockCenteringDecorator()],
  includeStories: ['interactive'],
  parameters: {
    docs: {
      page,
    },
  },
}

export const interactive = () => (
  <StatsWidgetContent
    data={object('data', StatsWidget.mockData)}
    params={object('params', defaultParams)}
  />
)

export const PreviewWrapper = () => <Preview>{interactive()}</Preview>
export const PropsPreview = () => <Props of={Stats} />
