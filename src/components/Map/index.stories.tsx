import React, { useState } from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Map } from '.'
import {
  EXAMPLE_CONNECTION_POINTS,
  EXAMPLE_LOCATIONS,
  EXAMPLE_POINTS,
  renderExampleConnectionPoint,
  renderExampleObjectPoint,
  renderExamplePoint,
} from './example-data'

storiesOf('components/Map', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '100vw', height: '100vh' }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [selectedObjectId, setSelectedObjectId] = useState()

      return (
        <Map
          locations={object('locations', EXAMPLE_LOCATIONS)}
          points={object('points', EXAMPLE_POINTS)}
          connectionPoints={object('connectionPoints', EXAMPLE_CONNECTION_POINTS)}
          selectedObjectId={selectedObjectId}
          onSelectedObjectIdChange={setSelectedObjectId}
          renderPoint={renderExamplePoint}
          renderObjectPoint={renderExampleObjectPoint}
          renderConnectionPoint={renderExampleConnectionPoint}
        />
      )
    }

    return <Wrapper />
  })
