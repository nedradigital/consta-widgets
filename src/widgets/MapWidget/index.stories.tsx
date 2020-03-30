import { Text } from '@gpn-design/uikit'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { MapWidget, MapWidgetContent } from './'

storiesOf('widgets/MapWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh', fontSize: 16 }))
  .add('interactive', () => (
    <>
      <MapWidgetContent data={MapWidget.mockData} params={{}} />
      <div>
        <Text tag="p" view="primary">
          Тестовые данные в виджет не добавлял, чтобы не раздувать размер бандла тяжёлыми
          мок-данными.
        </Text>
        <Text tag="p" view="primary">
          См. стори компонента: <code>components/Map</code>
        </Text>
      </div>
    </>
  ))
