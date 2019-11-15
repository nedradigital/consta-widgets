import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Data, Roadmap } from '.'

const currentDay = Date.UTC(2019, 6, 10)

const colorGroups = {
  green: '#219653',
  violet: '#AB63EE',
  blue: '#56B9F2',
  orange: '#FFA10A',
}

const data: readonly Data[] = [
  {
    place: '1. Ямбургское НГКМ',
    complex: 'МУПН 1500',
    plan: [
      {
        startDate: Date.UTC(2019, 0, 1),
        endDate: Date.UTC(2019, 2, 5),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 5),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    fact: [
      {
        startDate: Date.UTC(2019, 0, 19),
        endDate: Date.UTC(2019, 2, 27),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 27),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    forecast: [
      {
        startDate: currentDay,
        endDate: Date.UTC(2019, 9, 15),
        groupName: 'blue',
      },
      {
        startDate: Date.UTC(2019, 9, 15),
        endDate: Date.UTC(2019, 11, 31),
        groupName: 'orange',
      },
    ],
  },
  {
    place: '2. Место установки 2',
    complex: 'ZHQ-342-23',
    plan: [
      {
        startDate: Date.UTC(2019, 0, 1),
        endDate: Date.UTC(2019, 2, 5),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 5),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    fact: [
      {
        startDate: Date.UTC(2019, 0, 1),
        endDate: Date.UTC(2019, 1, 20),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 1, 20),
        endDate: Date.UTC(2019, 3, 25),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 3, 25),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    forecast: [
      {
        startDate: currentDay,
        endDate: Date.UTC(2019, 8, 18),
        groupName: 'blue',
      },
      {
        startDate: Date.UTC(2019, 8, 18),
        endDate: Date.UTC(2019, 11, 31),
        groupName: 'orange',
      },
    ],
  },
  {
    place: '3. Место установки 3',
    complex: 'МУПН 1300',
    plan: [
      {
        startDate: Date.UTC(2019, 0, 19),
        endDate: Date.UTC(2019, 1, 15),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 1, 15),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    fact: [
      {
        startDate: Date.UTC(2019, 1, 10),
        endDate: Date.UTC(2019, 3, 27),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 3, 27),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    forecast: [
      {
        startDate: currentDay,
        endDate: Date.UTC(2019, 7, 1),
        groupName: 'blue',
      },
      {
        startDate: Date.UTC(2019, 7, 1),
        endDate: Date.UTC(2019, 11, 31),
        groupName: 'orange',
      },
    ],
  },
  {
    place: '4. Место установки установок',
    complex: 'МУПН 1600',
    plan: [
      {
        startDate: Date.UTC(2019, 0, 1),
        endDate: Date.UTC(2019, 2, 7),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 7),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    fact: [
      {
        startDate: Date.UTC(2019, 0, 29),
        endDate: Date.UTC(2019, 2, 29),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 29),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    forecast: [
      {
        startDate: currentDay,
        endDate: Date.UTC(2019, 9, 15),
        groupName: 'blue',
      },
      {
        startDate: Date.UTC(2019, 9, 15),
        endDate: Date.UTC(2019, 11, 31),
        groupName: 'orange',
      },
    ],
  },
  {
    place: '5. Станция бурения в океане',
    complex: 'МУПН 1700',
    plan: [
      {
        startDate: Date.UTC(2019, 0, 28),
        endDate: Date.UTC(2019, 2, 10),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 2, 10),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    fact: [
      {
        startDate: Date.UTC(2019, 0, 4),
        endDate: Date.UTC(2019, 1, 25),
        groupName: 'green',
      },
      {
        startDate: Date.UTC(2019, 1, 25),
        endDate: Date.UTC(2019, 3, 27),
        groupName: 'violet',
      },
      {
        startDate: Date.UTC(2019, 3, 27),
        endDate: currentDay,
        groupName: 'blue',
      },
    ],
    forecast: [
      {
        startDate: currentDay,
        endDate: Date.UTC(2019, 7, 31),
        groupName: 'blue',
      },
      {
        startDate: Date.UTC(2019, 7, 31),
        endDate: Date.UTC(2019, 11, 31),
        groupName: 'orange',
      },
    ],
  },
]

const titles = ['МЕСТА УСТАНОВКИ', 'КОМПЛЕКС'] as const

storiesOf('components/Roadmap', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '80vw' }))
  .add('interactive', () => (
    <Roadmap titles={titles} currentDay={currentDay} colorGroups={colorGroups} data={data} />
  ))
