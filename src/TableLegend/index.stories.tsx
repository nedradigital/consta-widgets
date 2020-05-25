import React from 'react'

import { boolean, object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator, createMetadata, createStory } from '@/common/storybook'
import { Badge } from '@/Badge'
import { labelTypes as legendTypes } from '@/LegendItem'

import { TableLegend } from '.'
import { tableLegendData } from './data.mock'

type BadgeProps = React.ComponentProps<typeof Badge>

type RowId = { id: string }

type ListItem = Record<string, string | number | BadgeProps> & RowId

const convertItem = ({ id, ...obj }: ListItem) =>
  Object.keys(obj).reduce<Record<string, React.ReactNode> & RowId>(
    (acc, key) => {
      const item = obj[key]

      acc[key] = typeof item !== 'string' && typeof item !== 'number' ? <Badge {...item} /> : item

      return acc
    },
    { id }
  )

const badgeParams = {
  view: 'filled',
  isMinified: true,
  wpSize: 'm',
  text: '',
  comment: '',
} as const

const getList = () => {
  const data: readonly ListItem[] = object('list', [
    {
      id: 'row1',
      field: 'Северный бур',
      sum: 20,
      status: {
        ...badgeParams,
        status: 'normal',
      },
    },
    {
      id: 'row2',
      field: 'Южное месторождение',
      sum: 15,
      status: {
        ...badgeParams,
        status: 'warning',
      },
    },
    {
      id: 'row3',
      field: 'Западный разлом',
      sum: 7,
      status: {
        ...badgeParams,
        status: 'error',
      },
    },
  ])

  return data.map(convertItem)
}

const decorators = [withSmartKnobs(), blockCenteringDecorator({ width: '90vw' })] as const

export const Interactive = createStory(
  () => (
    <TableLegend isShowLegend={boolean('isShowLegend', false)} size="l" data={tableLegendData} />
  ),
  {
    name: 'обычная',
    decorators,
  }
)

export const TableLegendWithSelectedRow = createStory(
  () => {
    const [activeRowId, setActiveRowId] = React.useState<string | undefined>()

    return (
      <TableLegend
        isShowLegend={false}
        size="l"
        data={{
          ...tableLegendData,
          activeRow: {
            id: activeRowId,
            onChange: setActiveRowId,
          },
        }}
      />
    )
  },
  { name: 'c возможностью выбора активной строки', decorators }
)

export const WithTrafficLight = createStory(
  () => (
    <TableLegend
      isShowLegend={false}
      size="l"
      data={{
        colorGroups: object('colorGroups', {
          first: 'var(--color-bg-alert)',
          second: 'var(--color-bg-caution)',
          third: 'var(--color-bg-success)',
        }),
        list: getList(),
        legendFields: object('legendFields', [
          {
            field: 'Северный бур',
            colorGroupName: 'first',
            typeLegend: legendTypes[0],
          },
          {
            field: 'Южное месторождение',
            colorGroupName: 'second',
            typeLegend: legendTypes[0],
          },
          {
            field: 'Западный разлом',
            colorGroupName: 'third',
            typeLegend: legendTypes[0],
          },
        ]),
        columns: object('columns', [
          {
            title: 'Локация',
            accessor: 'field',
            align: 'left',
          },
          {
            title: 'Сумма скважин без МГРП',
            accessor: 'sum',
            align: 'right',
          },
          {
            title: 'Статус',
            accessor: 'status',
            align: 'center',
          },
        ]),
        filters: [
          {
            id: 'fieldNorthDrill',
            name: 'Северный бур',
            filterer: (value: string) => value === 'Северный бур',
            field: 'field',
          },
          {
            id: 'fieldSouthWell',
            name: 'Южное месторождение',
            filterer: (value: string) => value === 'Южное месторождение',
            field: 'field',
          },
          {
            id: 'fieldWestCrack',
            name: 'Западный разлом',
            filterer: (value: string) => value === 'Западный разлом',
            field: 'field',
          },

          {
            id: 'sumLess10',
            name: 'Менее 10',
            filterer: (value: number | string) => Number(value) < 10,
            field: 'sum',
          },
          {
            id: 'sumFrom10To20',
            name: 'От 10 (вкл.) до 20 (не вкл.)',
            filterer: (value: number | string) => Number(value) >= 10 && Number(value) < 20,
            field: 'sum',
          },
          {
            id: 'sum20AndMore',
            name: '20 и более',
            filterer: (value: number | string) => Number(value) >= 20,
            field: 'sum',
          },
        ],
      }}
    />
  ),
  {
    name: 'со "Светофором"',
    decorators: [withSmartKnobs(), blockCenteringDecorator({ width: 500 })],
  }
)

export default createMetadata({
  title: 'components/TableLegend',
})
