import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { App } from './'

storiesOf('App', module)
  .addDecorator(withKnobs)
  .add('Стандартный вид', () => {
    return <App />
  })
