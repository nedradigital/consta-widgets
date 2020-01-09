import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { types } from '@/components/LegendItem'
import { Data as TrafficLightData } from '@/components/TrafficLight'
import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { WidgetContentProps } from '@/utils/WidgetFactory'
import {
  defaultParams as defaultTrafficLightParams,
  Params as TrafficLightParams,
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
  .add('со "Светофором"', () => (
    <TableLegend
      isShowLegend={false}
      size="l"
      data={{
        colorGroups: object('colorGroups', {
          first: 'red',
          second: 'yellow',
          third: 'green',
        }),
        list: getList(),
        legendFields: object('legendFields', [
          {
            field: 'Северный бур',
            colorGroupName: 'first',
            typeLegend: types[0],
          },
          {
            field: 'Южное месторождение',
            colorGroupName: 'second',
            typeLegend: types[0],
          },
          {
            field: 'Западный разлом',
            colorGroupName: 'third',
            typeLegend: types[0],
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
      }}
    />
  ))
