import React from 'react'

import { Preview } from '@storybook/addon-docs/blocks'
import { object } from '@storybook/addon-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { BadgeWidget, BadgeWidgetContent, defaultParams } from '.'
import page from './docs.mdx'

export default {
  title: 'widgets/BadgeWidget',
  decorators: [blockCenteringDecorator()],
  includeStories: ['interactive'],
  parameters: { docs: { page } },
}

export const interactive = () => (
  <BadgeWidgetContent
    data={object('data', BadgeWidget.mockData)}
    params={object('params', defaultParams)}
  />
)

export const PreviewWrapper = () => (
  <Preview>
    {interactive()}
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
