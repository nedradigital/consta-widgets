import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { MapWidget, MapWidgetContent } from './'

storiesOf('widgets/MapWidget', module)
  .addDecorator(blockCenteringDecorator({ width: '60vw', height: '50vh', fontSize: 16 }))
  .add('interactive', () => (
    <>
      <MapWidgetContent data={MapWidget.mockData} params={{}} />
      <div>
        <p>
          Тестовые данные в виджет не добавлял, чтобы не раздувать размер бандла тяжёлыми
          мок-данными.
        </p>
        <p>
          См. стори компонента: <code>components/Map</code>
        </p>
      </div>
    </>
  ))
