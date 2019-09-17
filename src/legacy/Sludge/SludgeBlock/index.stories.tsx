import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { SludgeBlock } from '.'

const geologyIntervals = [
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
] as const

storiesOf('legacy/Sludge/SludgeBlock', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => <SludgeBlock geologyIntervals={geologyIntervals} />)
  .add('no data', () => <SludgeBlock />)
  .add('more than 8 intervals', () => (
    <SludgeBlock
      geologyIntervals={[
        {
          depthInterval: { top: 1000, bottom: 1500 },
          elements: [
            { name: 'Песок', value: 20 },
            { name: 'Уголь', value: 15 },
            { name: 'Сланец', value: 15 },
          ],
        },
        {
          depthInterval: { top: 2432, bottom: 2436 },
          elements: [
            { name: 'Алевролит', value: 25 },
            { name: 'Песчаник', value: 6 },
            { name: 'Цемент', value: 10 },
            { name: 'Песок', value: 20 },
            { name: 'Материал 1', value: 5 },
            { name: 'Материал 2', value: 9 },
            { name: 'Материал 3', value: 8 },
            { name: 'Материал 4', value: 3 },
            { name: 'Материал 5', value: 1 },
            { name: 'Материал 6', value: 1 },
            { name: 'Материал 7', value: 5 },
            { name: 'Материал 8', value: 2 },
            { name: 'Материал 9', value: 4 },
            { name: 'Материал 10', value: 1 },
          ],
        },
      ]}
    />
  ))
  .add('more than 8 intervals 2', () => (
    <SludgeBlock
      geologyIntervals={[
        {
          depthInterval: { top: 1000, bottom: 1500 },
          elements: [
            { name: 'Алевролит', value: 25 },
            { name: 'Песчаник', value: 6 },
            { name: 'Цемент', value: 10 },
            { name: 'Песок', value: 20 },
            { name: 'Материал 1', value: 5 },
            { name: 'Материал 2', value: 9 },
            { name: 'Материал 3', value: 8 },
            { name: 'Материал 4', value: 3 },
            { name: 'Материал 5', value: 1 },
            { name: 'Материал 6', value: 1 },
            { name: 'Материал 7', value: 5 },
            { name: 'Материал 8', value: 2 },
            { name: 'Материал 9', value: 4 },
            { name: 'Материал 10', value: 1 },
          ],
        },
        {
          depthInterval: { top: 2432, bottom: 2436 },
          elements: [
            { name: 'Песок', value: 20 },
            { name: 'Уголь', value: 15 },
            { name: 'Сланец', value: 15 },
          ],
        },
      ]}
    />
  ))
