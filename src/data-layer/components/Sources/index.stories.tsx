import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { exampleDataLayerConfig, exampleSourcesData, exampleSourcesList } from '../../index.stories'
import { DataLayer } from '../../types'

import { Sources } from '.'

const SourcesStory = () => {
  const [config, setConfig] = React.useState<DataLayer.Config>(exampleDataLayerConfig)

  return (
    <Sources
      sourcesList={exampleSourcesList}
      sourcesData={exampleSourcesData}
      config={config}
      onChangeConfig={setConfig}
    />
  )
}

storiesOf('data-layer/Sources', module)
  .addDecorator(blockCenteringDecorator({ width: 400, height: '100vh', padding: 20 }))
  .add('Источники', () => <SourcesStory />)
