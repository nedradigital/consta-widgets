import { CSFStory, StoryMetadata } from '@storybook/types'

export * from './decorators'
export * from './formatters'

export const createStory = (component: CSFStory, params: CSFStory['story'] = {}) => {
  component.story = { ...params }

  return component
}

export const createMetadata = (params: StoryMetadata) => params
