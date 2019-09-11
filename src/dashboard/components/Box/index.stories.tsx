import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { statuses } from '@/ui/Badge'
import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Box, IWidget } from '.'

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

storiesOf('dashboard/Box', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [widgets, changeWidgets] = React.useState<IWidget[]>([
        {
          name: 'AccumulatedTotal',
          props: {
            ...propsForWidget.AccumulatedTotal,
            data: dataForWidget.AccumulatedTotal,
          },
        },
        {
          name: 'CostGraph',
          props: {
            ...propsForWidget.CostGraph,
            data: dataForWidget.CostGraph,
          },
        },
      ])

      const handler = (_: string, items: IWidget[]) => {
        if (items.length > 0) {
          const lastItem = items[items.length - 1]
          items[items.length - 1] = {
            ...lastItem,
            props: {
              ...(propsForWidget[lastItem.name] || {}),
              data: dataForWidget[lastItem.name] || {},
            },
          }
        }

        changeWidgets(items)
      }

      return (
        <div style={{ position: 'relative' }}>
          <Box
            viewMode={boolean('viewMode', false)}
            widgets={widgets}
            onChangeWidgets={handler}
            data={{}}
            name="box"
            isPreview={false}
          />
        </div>
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Wrapper />
      </DndProvider>
    )
  })
