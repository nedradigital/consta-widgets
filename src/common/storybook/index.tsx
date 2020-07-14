import { CSFStory, StoryMetadata } from '@storybook/types'

export * from './decorators'
export * from './formatters'

export const createStory = (Component: React.FC, params: CSFStory['story'] = {}): CSFStory => {
  const wrapper = () => <Component />
  wrapper.story = { ...params }

  return wrapper
}

export const createMetadata = (params: StoryMetadata) => params
