import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { SludgeChart } from '.'

const data = {
  elements: [
    { name: 'Песч.', value: 85 },
    { name: 'Алев.', value: 10 },
    { name: 'Арг.', value: 5 },
    { name: 'Песок', value: 0 },
    { name: 'Мат. 1', value: 0 },
    { name: 'Мат. 2', value: 0 },
  ],
  geologyIntervals: [
    {
      depthInterval: { top: 10, bottom: 1000 },
      elements: [{ name: 'Песок', value: 100 }],
    },
    {
      depthInterval: { top: 1000, bottom: 1500 },
      elements: [{ name: 'Мат. 1', value: 85 }, { name: 'Мат. 2', value: 15 }],
    },
    {
      depthInterval: { top: 2434, bottom: 2436 },
      elements: [
        { name: 'Алев.', value: 10 },
        { name: 'Арг.', value: 5 },
        { name: 'Песч.', value: 85 },
      ],
    },
  ],
}

storiesOf('components/Sludge/SludgeChart', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator({ width: '380px', height: '250px', position: 'relative' }))
  .add('interactive', () => {
    return <SludgeChart {...data} />
  })
