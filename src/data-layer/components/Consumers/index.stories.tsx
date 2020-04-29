import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { exampleDataLayerConfig, exampleSourcesData } from '../../index.stories'
import { DataLayer } from '../../types'

import { Consumers } from '.'

const SourcesStory = () => {
  const [config, setConfig] = React.useState<DataLayer.Config>(exampleDataLayerConfig)

  return <Consumers sourcesData={exampleSourcesData} config={config} onChangeConfig={setConfig} />
}

storiesOf('data-layer/Consumers', module)
  .addDecorator(blockCenteringDecorator({ height: '100vh', padding: 20 }))
  .add('Потребители', () => <SourcesStory />)
