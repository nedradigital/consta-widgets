import { ColorGroups } from '@/common/types'
import { Filters } from '@/common/utils/table'

import { Data, Row } from '.'

export const colorGroups: ColorGroups = {
  green: 'var(--color-bg-success)',
  violet: '#A13DFF',
  blue: 'var(--color-bg-normal)',
  orange: 'var(--color-bg-warning)',
}

/* istanbul ignore next */
export const dataFilters: Filters<Row> = [
  {
    id: 'yamburghNGKM',
    name: 'Ямбургское НГКМ',
    filterer: (value: string) => value === '1. Ямбургское НГКМ',
    field: 'installationPlaces',
  },
  {
    id: 'mountingPlaceNumber2',
    name: 'Место установки 2',
    filterer: (value: string) => value === '2. Место установки 2',
    field: 'installationPlaces',
  },
  {
    id: 'mountingPlaceNumber3',
    name: 'Место установки 3',
    filterer: (value: string) => value === '3. Место установки 3',
    field: 'installationPlaces',
  },
  {
    id: 'mountingPlaceMounting',
    name: 'Место установки установок',
    filterer: (value: string) => value === '4. Место установки установок',
    field: 'installationPlaces',
  },
  {
    id: 'oceanDrillingStation',
    name: 'Станция бурения в океане',
    filterer: (value: string) => value === '5. Станция бурения в океане',
    field: 'installationPlaces',
  },
  {
    id: 'mupn1500',
    name: 'МУПН 1500',
    filterer: (value: string) => value === 'МУПН 1500',
    field: 'complex',
  },
  {
    id: 'zhq-342-23',
    name: 'ZHQ-342-23',
    filterer: (value: string) => value === 'ZHQ-342-23',
    field: 'complex',
  },
  {
    id: 'mupn1300',
    name: 'МУПН 1300',
    filterer: (value: string) => value === 'МУПН 1300',
    field: 'complex',
  },
  {
    id: 'mupn1600',
    name: 'МУПН 1600',
    filterer: (value: string) => value === 'МУПН 1600',
    field: 'complex',
  },
  {
    id: 'mupn1700',
    name: 'МУПН 1700',
    filterer: (value: string) => value === 'МУПН 1700',
    field: 'complex',
  },
]

export const data: Data = {
  startDate: Date.UTC(2019, 0, 1),
  currentDay: Date.UTC(2019, 6, 10),
  endDate: Date.UTC(2020, 11, 31),
  titles: [
    {
      title: 'МЕСТА УСТАНОВКИ',
      accessor: 'installationPlaces',
    },
    {
      title: 'КОМПЛЕКС',
      accessor: 'complex',
      align: 'center',
    },
  ],
  rows: [
    {
      id: 'row1',
      columns: {
        installationPlaces: '1. Ямбургское НГКМ',
        complex: 'МУПН 1500',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 2, 5),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 19),
            endDate: Date.UTC(2019, 2, 27),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 5),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 2, 27),
            endDate: Date.UTC(2019, 4, 12),
          },
          comment: 'Какой-то комментарий',
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 9, 15),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 6, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 10),
            endDate: Date.UTC(2019, 9, 15),
          },
          comment: 'Какой-то комментарий для синего факта',
          groupName: 'blue',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 9, 15),
            endDate: Date.UTC(2019, 11, 31),
          },
          forecast: {
            startDate: Date.UTC(2019, 9, 15),
            endDate: Date.UTC(2019, 11, 31),
          },
          comment: 'Какой-то комментарий для оранжевого прогноза',
          groupName: 'orange',
        },
      ],
    },
    {
      id: 'row2',
      columns: {
        installationPlaces: '2. Место установки 2',
        complex: 'ZHQ-342-23',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 2, 5),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 1, 20),
          },
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 5),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 1, 20),
            endDate: Date.UTC(2019, 3, 25),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 8, 18),
          },
          fact: {
            startDate: Date.UTC(2019, 3, 25),
            endDate: Date.UTC(2019, 6, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 10),
            endDate: Date.UTC(2019, 8, 18),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'blue',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 8, 18),
            endDate: Date.UTC(2019, 11, 31),
          },
          forecast: {
            startDate: Date.UTC(2019, 8, 18),
            endDate: Date.UTC(2019, 11, 31),
          },
          groupName: 'orange',
        },
      ],
    },
    {
      id: 'row3',
      columns: {
        installationPlaces: '3. Место установки 3',
        complex: 'МУПН 1300',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 19),
            endDate: Date.UTC(2019, 1, 15),
          },
          fact: {
            startDate: Date.UTC(2019, 1, 10),
            endDate: Date.UTC(2019, 3, 27),
          },
          comment: 'Какой-то комментарий',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 1, 15),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 3, 27),
            endDate: Date.UTC(2019, 4, 12),
          },
          comment: 'Какой-то комментарий',
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 7, 1),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 6, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 10),
            endDate: Date.UTC(2019, 7, 1),
          },
          comment: 'Какой-то комментарий',
          groupName: 'blue',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 7, 1),
            endDate: Date.UTC(2019, 11, 31),
          },
          forecast: {
            startDate: Date.UTC(2019, 7, 1),
            endDate: Date.UTC(2019, 11, 31),
          },
          groupName: 'orange',
        },
      ],
    },
    {
      id: 'row4',
      columns: {
        installationPlaces: '4. Место установки установок',
        complex: 'МУПН 1600',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 2, 7),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 29),
            endDate: Date.UTC(2019, 2, 29),
          },
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 7),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 2, 29),
            endDate: Date.UTC(2019, 4, 12),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 9, 15),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 6, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 10),
            endDate: Date.UTC(2019, 9, 15),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'blue',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 9, 15),
            endDate: Date.UTC(2019, 11, 31),
          },
          forecast: {
            startDate: Date.UTC(2019, 9, 15),
            endDate: Date.UTC(2019, 11, 31),
          },
          groupName: 'orange',
        },
      ],
    },
    {
      id: 'row5',
      columns: {
        installationPlaces: '5. Станция бурения в океане',
        complex: 'МУПН 1700',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 28),
            endDate: Date.UTC(2019, 2, 10),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 4),
            endDate: Date.UTC(2019, 1, 25),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 10),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 1, 25),
            endDate: Date.UTC(2019, 3, 27),
          },
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 7, 31),
          },
          fact: {
            startDate: Date.UTC(2019, 3, 27),
            endDate: Date.UTC(2019, 6, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 10),
            endDate: Date.UTC(2019, 7, 31),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'blue',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 7, 31),
            endDate: Date.UTC(2020, 11, 31),
          },
          forecast: {
            startDate: Date.UTC(2019, 7, 31),
            endDate: Date.UTC(2020, 11, 15),
          },
          groupName: 'orange',
        },
      ],
    },
  ],
  filters: dataFilters,
}

/* istanbul ignore next */
export const minimalDataFilters: Filters<Row> = [
  {
    id: 'yamburghNGKM',
    name: 'Ямбургское НГКМ',
    filterer: (value: string) => value === '1. Ямбургское НГКМ',
    field: 'installationPlaces',
  },
  {
    id: 'mountingPlaceNumber2',
    name: 'Место установки 2',
    filterer: (value: string) => value === '2. Место установки 2',
    field: 'installationPlaces',
  },
  {
    id: 'mupn1500',
    name: 'МУПН 1500',
    filterer: (value: string) => value === 'МУПН 1500',
    field: 'complex',
  },
  {
    id: 'zhq-342-23',
    name: 'ZHQ-342-23',
    filterer: (value: string) => value === 'ZHQ-342-23',
    field: 'complex',
  },
]

export const minimalData: Data = {
  startDate: Date.UTC(2019, 0, 1),
  currentDay: Date.UTC(2019, 6, 10),
  endDate: Date.UTC(2019, 6, 10),
  titles: [
    {
      title: 'МЕСТА УСТАНОВКИ',
      accessor: 'installationPlaces',
    },
    {
      title: 'КОМПЛЕКС',
      accessor: 'complex',
      align: 'center',
    },
  ],
  rows: [
    {
      id: 'row1',
      columns: {
        installationPlaces: '1. Ямбургское НГКМ',
        complex: 'МУПН 1500',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 2, 5),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 19),
            endDate: Date.UTC(2019, 2, 27),
          },
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 5),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 2, 27),
            endDate: Date.UTC(2019, 4, 12),
          },
          groupName: 'violet',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 6, 10),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 12),
            endDate: Date.UTC(2019, 6, 10),
          },
          groupName: 'blue',
        },
      ],
    },
    {
      id: 'row2',
      columns: {
        installationPlaces: '2. Место установки 2',
        complex: 'ZHQ-342-23',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 2, 5),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 1),
            endDate: Date.UTC(2019, 1, 20),
          },
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 5),
            endDate: Date.UTC(2019, 4, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 1, 20),
            endDate: Date.UTC(2019, 3, 25),
          },
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          groupName: 'violet',
        },
      ],
    },
  ],
  filters: minimalDataFilters,
}

/* istanbul ignore next */
export const monochromeDataFilters: Filters<Row> = [
  {
    id: 'clusterKP4',
    name: 'КП4',
    filterer: (value: string) => value === 'КП4',
    field: 'cluster',
  },
  {
    id: 'clusterKP6',
    name: 'КП6',
    filterer: (value: string) => value === 'КП6',
    field: 'cluster',
  },
  {
    id: 'clusterKP7',
    name: 'КП7',
    filterer: (value: string) => value === 'КП7',
    field: 'cluster',
  },
  {
    id: 'clusterKP8',
    name: 'КП8',
    filterer: (value: string) => value === 'КП8',
    field: 'cluster',
  },
]

export const monochromeData: Data = {
  startDate: Date.UTC(2019, 0, 1),
  currentDay: Date.UTC(2019, 6, 6),
  endDate: Date.UTC(2019, 11, 31),
  titles: [
    {
      title: 'Куст',
      accessor: 'cluster',
      align: 'center',
    },
  ],
  rows: [
    {
      id: 'row1',
      columns: {
        cluster: 'КП4',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 20),
            endDate: Date.UTC(2019, 2, 20),
          },
          fact: {
            startDate: Date.UTC(2019, 0, 20),
            endDate: Date.UTC(2019, 2, 10),
          },
          title: 'Скважина: 1',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 20),
            endDate: Date.UTC(2019, 4, 10),
          },
          fact: {
            startDate: Date.UTC(2019, 2, 10),
            endDate: Date.UTC(2019, 4, 10),
          },
          title: 'Скважина: 2',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 10),
            endDate: Date.UTC(2019, 5, 25),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 10),
            endDate: Date.UTC(2019, 5, 27),
          },
          title: 'Скважина: 3',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 5, 25),
            endDate: Date.UTC(2019, 6, 29),
          },
          fact: {
            startDate: Date.UTC(2019, 5, 27),
            endDate: Date.UTC(2019, 6, 6),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 6),
            endDate: Date.UTC(2019, 7, 5),
          },
          title: 'Скважина: 4',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 6, 29),
            endDate: Date.UTC(2019, 7, 30),
          },
          forecast: {
            startDate: Date.UTC(2019, 7, 5),
            endDate: Date.UTC(2019, 8, 15),
          },
          title: 'Скважина: 5',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 7, 30),
            endDate: Date.UTC(2019, 9, 15),
          },
          forecast: {
            startDate: Date.UTC(2019, 8, 15),
            endDate: Date.UTC(2019, 10, 10),
          },
          title: 'Скважина: 6',
          groupName: 'green',
        },
      ],
    },
    {
      id: 'row2',
      columns: {
        cluster: 'КП6',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 0, 20),
            endDate: Date.UTC(2019, 2, 20),
          },
          fact: {
            startDate: Date.UTC(2019, 1, 4),
            endDate: Date.UTC(2019, 2, 28),
          },
          title: 'Скважина: 7',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 2, 20),
            endDate: Date.UTC(2019, 4, 5),
          },
          fact: {
            startDate: Date.UTC(2019, 2, 28),
            endDate: Date.UTC(2019, 5, 1),
          },
          title: 'Скважина: 8',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 5),
            endDate: Date.UTC(2019, 6, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 5, 1),
            endDate: Date.UTC(2019, 6, 6),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 6),
            endDate: Date.UTC(2019, 7, 2),
          },
          title: 'Скважина: 9',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 6, 12),
            endDate: Date.UTC(2019, 8, 15),
          },
          forecast: {
            startDate: Date.UTC(2019, 7, 2),
            endDate: Date.UTC(2019, 8, 12),
          },
          title: 'Скважина: 10',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 8, 15),
            endDate: Date.UTC(2019, 9, 20),
          },
          forecast: {
            startDate: Date.UTC(2019, 8, 12),
            endDate: Date.UTC(2019, 9, 18),
          },
          title: 'Скважина: 11',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 9, 20),
            endDate: Date.UTC(2019, 11, 10),
          },
          forecast: {
            startDate: Date.UTC(2019, 9, 18),
            endDate: Date.UTC(2019, 11, 10),
          },
          title: 'Скважина: 12',
          groupName: 'green',
        },
      ],
    },
    {
      id: 'row3',
      columns: {
        cluster: 'КП7',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 4, 4),
            endDate: Date.UTC(2019, 5, 25),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 4),
            endDate: Date.UTC(2019, 5, 25),
          },
          title: 'Скважина: 13',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 5, 25),
            endDate: Date.UTC(2019, 7, 12),
          },
          fact: {
            startDate: Date.UTC(2019, 5, 25),
            endDate: Date.UTC(2019, 6, 6),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 6),
            endDate: Date.UTC(2019, 7, 9),
          },
          title: 'Скважина: 14',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 8, 13),
            endDate: Date.UTC(2019, 9, 15),
          },
          forecast: {
            startDate: Date.UTC(2019, 8, 13),
            endDate: Date.UTC(2019, 9, 12),
          },
          title: 'Скважина: 15',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 9, 15),
            endDate: Date.UTC(2019, 10, 30),
          },
          forecast: {
            startDate: Date.UTC(2019, 9, 12),
            endDate: Date.UTC(2019, 10, 30),
          },
          title: 'Скважина: 16',
          groupName: 'green',
        },
      ],
    },
    {
      id: 'row4',
      columns: {
        cluster: 'КП8',
      },
      groups: [
        {
          plan: {
            startDate: Date.UTC(2019, 3, 9),
            endDate: Date.UTC(2019, 4, 31),
          },
          fact: {
            startDate: Date.UTC(2019, 3, 9),
            endDate: Date.UTC(2019, 4, 31),
          },
          title: 'Скважина: 17',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 4, 31),
            endDate: Date.UTC(2019, 7, 9),
          },
          fact: {
            startDate: Date.UTC(2019, 4, 31),
            endDate: Date.UTC(2019, 6, 6),
          },
          forecast: {
            startDate: Date.UTC(2019, 6, 6),
            endDate: Date.UTC(2019, 7, 9),
          },
          title: 'Скважина: 18',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 7, 9),
            endDate: Date.UTC(2019, 8, 18),
          },
          forecast: {
            startDate: Date.UTC(2019, 7, 9),
            endDate: Date.UTC(2019, 8, 15),
          },
          title: 'Скважина: 19',
          groupName: 'green',
        },
        {
          plan: {
            startDate: Date.UTC(2019, 8, 18),
            endDate: Date.UTC(2019, 10, 5),
          },
          forecast: {
            startDate: Date.UTC(2019, 8, 15),
            endDate: Date.UTC(2019, 10, 3),
          },
          title: 'Скважина: 20',
          groupName: 'green',
        },
      ],
    },
  ],
  filters: monochromeDataFilters,
}
