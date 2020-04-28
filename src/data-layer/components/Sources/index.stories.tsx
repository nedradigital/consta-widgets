import React from 'react'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { exampleDataLayerConfig, exampleSourcesData, exampleSourcesList } from '../../index.stories'
import { DataLayer } from '../../types'

import { Sources } from '.'

export const SourcesStory = createStory(
  () => {
    const [config, setConfig] = React.useState<DataLayer.Config>(exampleDataLayerConfig)

    return (
      <Sources
        sourcesList={exampleSourcesList}
        sourcesData={exampleSourcesData}
        config={config}
        onChangeConfig={setConfig}
      />
    )
  },
  { name: 'Источники' }
)

export default createMetadata({
  title: 'data-layer/Sources',
  decorators: [blockCenteringDecorator({ width: 400, height: '100vh', padding: 20 })],
})
