import React from 'react'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { exampleDataLayerConfig, exampleSourcesData } from '../../index.stories'
import { DataLayer } from '../../types'

import { Consumers } from '.'

export const SourcesStory = createStory(
  () => {
    const [config, setConfig] = React.useState<DataLayer.Config>(exampleDataLayerConfig)

    return <Consumers sourcesData={exampleSourcesData} config={config} onChangeConfig={setConfig} />
  },
  { name: 'Потребители' }
)

export default createMetadata({
  title: 'data-layer/Consumers',
  decorators: [blockCenteringDecorator({ height: '100vh', padding: 20 })],
})
