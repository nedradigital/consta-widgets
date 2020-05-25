import React, { useState } from 'react'

import { boolean, object } from '@storybook/addon-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'

import { Map } from '.'
import {
  EXAMPLE_CONNECTION_POINTS,
  EXAMPLE_LOCATIONS,
  EXAMPLE_POINTS,
  renderExampleConnectionLine,
  renderExampleConnectionPoint,
  renderExampleObjectPoint,
  renderExamplePoint,
  renderExampleZoomOutButton,
} from './example-data'
import { GinfPrototype as MapGinfPrototypeStory } from './example-data/ginf-prototype'

const MapTsubPrototypeStory = () => {
  const [selectedObjectId, setSelectedObjectId] = useState<string>()

  return (
    <Map
      allowClickOnSelectedObject={boolean('allowClickOnSelectedObject', false)}
      locations={EXAMPLE_LOCATIONS}
      points={EXAMPLE_POINTS}
      connectionPoints={EXAMPLE_CONNECTION_POINTS}
      padding={object('padding', [50, 160])}
      selectedObjectId={selectedObjectId}
      onSelectedObjectIdChange={setSelectedObjectId}
      renderPoint={renderExamplePoint}
      renderObjectPoint={renderExampleObjectPoint}
      renderConnectionPoint={renderExampleConnectionPoint}
      renderConnectionLine={renderExampleConnectionLine}
      renderZoomOutButton={renderExampleZoomOutButton}
    />
  )
}

export const ExampleForTSUB = createStory(() => <MapTsubPrototypeStory />, {
  name: 'Пример для ЦУБ-а',
})

export const ExampleForInfopanels = createStory(() => <MapGinfPrototypeStory />, {
  name: 'Пример для Инфопанелей',
})

export default createMetadata({
  title: 'components/Map',
  decorators: [blockCenteringDecorator({ width: '100vw', height: '100vh' })],
})
