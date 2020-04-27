import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { GridContent, GridItem } from '@/dashboard'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { widgetIdsByType } from '@/utils/widgets-list'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { defaultParams as linearChartWidgetDefaultParams } from '@/widgets/LinearChartWidget'
import { defaultParams as statsWidgetDefaultParams } from '@/widgets/StatsWidget'
import { defaultParams as textDefaultParams } from '@/widgets/TextWidget'

import { Grid } from '.'

const gridItem: GridItem = {
  type: 'grid',
  grid: {
    columnParams: [{ growRatio: 1 }, { growRatio: 2, verticalAlignment: 'middle' }],
    rowParams: [{}, {}],
    items: [
      // Строка 1
      [
        // Колонка 1
        [
          {
            type: 'widget',
            debugName: 'TitleWidget',
            id: getUniqueName('TitleWidget'),
            widgetType: widgetIdsByType.TextWidget,
            params: textDefaultParams,
          },
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: widgetIdsByType.StatsWidget,
            params: statsWidgetDefaultParams,
          },
        ],
        // Колонка 2
        [
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: widgetIdsByType.StatsWidget,
            params: statsWidgetDefaultParams,
          },
        ],
      ],
      // Строка 2
      [
        // Колонка 1
        [
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: widgetIdsByType.StatsWidget,
            params: statsWidgetDefaultParams,
          },
        ],
        // Колонка 2
        [
          {
            type: 'widget',
            debugName: 'LinearChartWidget',
            id: getUniqueName('LinearChartWidget'),
            widgetType: widgetIdsByType.LinearChartWidget,
            params: {
              ...linearChartWidgetDefaultParams,
              growRatio: 1,
            },
          },
        ],
      ],
    ],
  },
  params: {},
}

const GridStory = () => {
  const [config, changeConfig] = React.useState(gridItem)

  const handler = (newGridContent: GridContent) => {
    changeConfig({ ...config, grid: newGridContent })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        viewMode={boolean('viewMode', false)}
        onChange={handler}
        params={object('params', {
          verticalMargin: 'xs',
          horizontalMargin: 'xs',
        })}
        data={{}}
        datasets={[]}
        {...config}
      />
    </DndProvider>
  )
}

storiesOf('dashboard/Grid', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <GridStory />)
