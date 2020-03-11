import React, { useState } from 'react'

import { boolean, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Map } from '.'
import {
  EXAMPLE_CONNECTION_POINTS,
  EXAMPLE_LOCATIONS,
  EXAMPLE_POINTS,
  renderExampleConnectionLine,
  renderExampleConnectionPoint,
  renderExampleObjectPoint,
  renderExamplePoint,
} from './example-data'
import { GinfPrototype as MapGinfPrototypeStory } from './example-data/ginf-prototype'

const MapTsubPrototypeStory = () => {
  const [selectedObjectId, setSelectedObjectId] = useState()

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
    />
  )
}

storiesOf('components/Map', module)
  .addDecorator(blockCenteringDecorator({ width: '100vw', height: '100vh' }))
  .add('Пример для ЦУБ-а', () => <MapTsubPrototypeStory />)
  .add('Пример для Инфопанелей', () => <MapGinfPrototypeStory />)
