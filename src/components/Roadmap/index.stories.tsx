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
    firstColumn: '1. Ямбургское НГКМ',
    secondColumn: 'МУПН 1500',
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
        comment: 'Какой-то комментарий',
      },
      {
        startDate: Date.UTC(2019, 2, 27),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
        comment: 'Какой-то комментарий',
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
    firstColumn: '2. Место установки 2',
    secondColumn: 'ZHQ-342-23',
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
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      },
      {
        startDate: Date.UTC(2019, 3, 25),
        endDate: currentDay,
        groupName: 'blue',
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
    firstColumn: '3. Место установки 3',
    secondColumn: 'МУПН 1300',
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
        comment: 'Какой-то комментарий',
      },
      {
        startDate: Date.UTC(2019, 3, 27),
        endDate: Date.UTC(2019, 4, 12),
        groupName: 'violet',
        comment: 'Какой-то комментарий',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
        comment: 'Какой-то комментарий',
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
    firstColumn: '4. Место установки установок',
    secondColumn: 'МУПН 1600',
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
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      },
      {
        startDate: Date.UTC(2019, 4, 12),
        endDate: currentDay,
        groupName: 'blue',
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
    firstColumn: '5. Станция бурения в океане',
    secondColumn: 'МУПН 1700',
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
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
        comment:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
