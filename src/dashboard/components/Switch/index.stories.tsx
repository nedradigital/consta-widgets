import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { SwitchContent, SwitchItem } from '@/dashboard'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { widgetIdsByType } from '@/utils/widgets-list'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { defaultParams as linearChartWidgetDefaultParams } from '@/widgets/LinearChartWidget'
import { defaultParams as statsWidgetDefaultParams } from '@/widgets/StatsWidget'
import { defaultParams as textDefaultParams } from '@/widgets/TextWidget'

import { Switch } from '.'

const switchItem: SwitchItem = {
  id: 'datasetId',
  type: 'switch',
  displays: [
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
  params: {},
}

const SwitchStory = () => {
  const [config, changeConfig] = React.useState(switchItem)

  const handler = (displays: SwitchContent) => {
    changeConfig({ ...config, displays })
  }

  const viewMode = boolean('viewMode', false)

  return (
    <DndProvider backend={HTML5Backend}>
      <Switch
        viewMode={viewMode}
        onChange={handler}
        data={{
          datasetId: number('currentDisplay', 1, { min: 1, max: config.displays.length }),
        }}
        datasets={[]}
        dataKey={config.id}
        {...config}
      />
    </DndProvider>
  )
}

storiesOf('dashboard/Switch', module)
  .addDecorator(blockCenteringDecorator({ height: 300, width: 600 }))
  .add('interactive', () => <SwitchStory />)
