import React from 'react'

import { text } from '@storybook/addon-knobs'
import { DecoratorFn } from '@storybook/react'
import { CSFStory, StoryMetadata } from '@storybook/types'

export const blockCenteringDecorator = (
  styles: React.CSSProperties = {}
): DecoratorFn => storyFn => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      minHeight: '100vh',
      maxWidth: '100%',
      width: '100%',
    }}
  >
    <div style={styles}>{storyFn()}</div>
  </div>
)

export const cubeMeterFormatValue = (v: number) => {
  return `${v}${text('unit', ' тыс м3')}`
}

export const percentFormatValue = (v: number) => {
  return `${v}${text('unit', '%')}`
}

export const emptyFormatValue = (v: number) => {
  return `${v}${text('unit', '')}`
}

export const createStory = (component: CSFStory, params: CSFStory['story'] = {}) => {
  component.story = { ...params }

  return component
}

export const createMetadata = (params: StoryMetadata) => params
