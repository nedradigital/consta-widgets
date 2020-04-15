import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Data as TrafficLightData } from '@/components/TrafficLight'
import { DataType } from '@/dashboard'
import { legendParams, TrafficLightParams } from '@/dashboard/widget-params'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { WidgetContentProps } from '@/utils/WidgetFactory'
import {
  defaultParams as defaultTrafficLightParams,
  TrafficLightWidgetContent,
} from '@/widgets/TrafficLightWidget'

import { TableLegend } from '.'

type TrafficLightProps = WidgetContentProps<TrafficLightData, TrafficLightParams>

type ListItem = Record<string, string | number | TrafficLightProps>

const convertItem = (obj: ListItem) => {
  return Object.keys(obj).reduce<Record<string, React.ReactNode>>((acc, key) => {
    const item = obj[key]

    acc[key] =
      typeof item !== 'string' && typeof item !== 'number' ? (
        <TrafficLightWidgetContent {...item} />
      ) : (
        item
      )

    return acc
  }, {})
}

const getList = () => {
  const data: readonly ListItem[] = object('list', [
    {
      field: 'Северный бур',
      sum: 20,
      status: {
        data: {
          status: 'normal',
          text: '',
          comment: '',
        },
        params: defaultTrafficLightParams,
      },
    },
    {
      field: 'Южное месторождение',
      sum: 15,
      status: {
        data: {
          status: 'warning',
          text: '',
          comment: '',
        },
        params: defaultTrafficLightParams,
      },
    },
    {
      field: 'Западный разлом',
      sum: 7,
      status: {
        data: {
          status: 'danger',
          text: '',
          comment: '',
        },
        params: defaultTrafficLightParams,
      },
    },
  ])

  return data.map(convertItem)
}

storiesOf('components/TableLegend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '90vw' }))
  .add('обычная', () => (
    <TableLegend
      isShowLegend={false}
      size="l"
      data={object('data', getWidgetMockData(DataType.TableLegend))}
    />
  ))

storiesOf('components/TableLegend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 500 }))
  .add('со "Светофором"', () => (
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
            typeLegend: legendParams.labelTypes[0],
          },
          {
            field: 'Южное месторождение',
            colorGroupName: 'second',
            typeLegend: legendParams.labelTypes[0],
          },
          {
            field: 'Западный разлом',
            colorGroupName: 'third',
            typeLegend: legendParams.labelTypes[0],
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
  ))
