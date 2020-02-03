import React from 'react'

import { number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Roadmap } from '.'

const roadmapData = {
  startDate: Date.UTC(2019, 0, 1),
  endDate: Date.UTC(2019, 6, 10),
  values: [
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
          endDate: Date.UTC(2019, 6, 10),
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
          endDate: Date.UTC(2019, 6, 10),
          groupName: 'blue',
        },
      ],
      forecast: [],
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
      ],
      forecast: [],
    },
  ],
  titles: [
    {
      title: 'МЕСТА УСТАНОВКИ',
      accessor: 'firstColumn',
    },
    {
      title: 'КОМПЛЕКС',
      accessor: 'secondColumn',
    },
  ],
  filters: [
    {
      id: 'yamburghNGKM',
      name: 'Ямбургское НГКМ',
      filterer: (value: string) => value === '1. Ямбургское НГКМ',
      field: 'firstColumn',
    },
    {
      id: 'mountingPlaceNumber2',
      name: 'Место установки 2',
      filterer: (value: string) => value === '2. Место установки 2',
      field: 'firstColumn',
    },
    {
      id: 'mupn1500',
      name: 'МУПН 1500',
      filterer: (value: string) => value === 'МУПН 1500',
      field: 'secondColumn',
    },
    {
      id: 'zhq-342-23',
      name: 'ZHQ-342-23',
      filterer: (value: string) => value === 'ZHQ-342-23',
      field: 'secondColumn',
    },
  ],
  currentDay: Date.UTC(2019, 6, 10),
} as const

storiesOf('components/Roadmap', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '80vw' }))
  .add('interactive', () => {
    const {
      data: { titles, values, currentDay, startDate, endDate, filters },
      colorGroups,
    } = getWidgetMockData(DataType.Roadmap)[0]

    return (
      <Roadmap
        data={object('data', values)}
        currentDay={number('currentDay', currentDay)}
        titles={[
          { title: text('firstColumn', titles[0].title), accessor: titles[0].accessor },
          { title: text('secondColumn', titles[1].title), accessor: titles[1].accessor },
        ]}
        colorGroups={object('colorGroups', colorGroups)}
        filters={object('filters', filters)}
        startDate={startDate}
        endDate={endDate}
      />
    )
  })
  .add('few values', () => {
    const { colorGroups } = getWidgetMockData(DataType.Roadmap)[0]
    const { titles, currentDay, values, startDate, endDate, filters } = roadmapData

    return (
      <Roadmap
        data={object('data', values)}
        currentDay={number('currentDay', currentDay)}
        titles={[
          { title: text('firstColumn', titles[0].title), accessor: titles[0].accessor },
          { title: text('secondColumn', titles[1].title), accessor: titles[1].accessor },
        ]}
        colorGroups={object('colorGroups', colorGroups)}
        filters={object('filters', filters)}
        startDate={startDate}
        endDate={endDate}
      />
    )
  })
