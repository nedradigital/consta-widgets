import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { statuses } from '@/ui/Badge'
import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Columns, ColumnsItem } from '.'

const dataForWidget: { [key: string]: {} } = {
  AccumulatedTotal: {
    cost: {
      value: -88,
      percent: -2.1,
      status: statuses[0],
    },
    incidents: {
      value: -121.3,
      percent: -16.2,
      status: statuses[1],
    },
    deadlines: {
      value: -217,
      percent: -2.1,
      status: statuses[2],
    },
    time: {
      value: 1.1,
      percent: -1.3,
    },
  },
  CostGraph: getArrayWithRandomInt(5, 10, 12 * 4),
  TechnologicalInnovation: [
    {
      text: 'Предиктивное моделирование пластов',
      label: 'Research',
    },
    {
      text: 'Визуализация процессов бурения',
      label: 'Test',
    },
    {
      text: 'Система «Виртуальный бурильщик»',
      label: 'MVP',
    },
  ],
}

const propsForWidget: { [key: string]: {} } = {
  AccumulatedTotal: {},
  CostGraph: {
    title: 'стоимость к продуктивности',
    unitName: 'руб/ м³ /сут Х атм',
    legendName: 'средневзвешенная',
  },
  TechnologicalInnovation: {},
} as { [key: string]: {} }

storiesOf('dashboard/Columns', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [config, changeConfig] = React.useState<ColumnsItem>({
        type: 'columns',
        columns: [
          [
            {
              name: 'AccumulatedTotal',
              type: 'widget',
              props: {
                ...propsForWidget.AccumulatedTotal,
                data: dataForWidget.AccumulatedTotal,
              },
            },
          ],
          [
            {
              name: 'AccumulatedTotal',
              type: 'widget',
              props: {
                ...propsForWidget.AccumulatedTotal,
                data: dataForWidget.AccumulatedTotal,
              },
            },
          ],
        ],
      })

      const handler = (columns: ColumnsItem['columns']) => {
        changeConfig({ ...config, columns })
      }

      return (
        <Columns
          viewMode={boolean('viewMode', false)}
          isPreview={false}
          onChange={handler}
          data={{}}
          {...config}
        />
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Wrapper />
      </DndProvider>
    )
  })
