import { Text } from '@gpn-design/uikit'

import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { MapWidget, MapWidgetContent } from './'

export const Interactive = createStory(() => (
  <>
    <MapWidgetContent data={MapWidget.mockData} params={{}} />
    <div>
      <Text tag="p" view="primary">
        Тестовые данные в виджет не добавлял, чтобы не раздувать размер бандла тяжёлыми мок-данными.
      </Text>
      <Text tag="p" view="primary">
        См. стори компонента: <code>components/Map</code>
      </Text>
    </div>
  </>
))

export default createMetadata({
  title: 'widgets/MapWidget',
  decorators: [blockCenteringDecorator({ width: '60vw', height: '50vh', fontSize: 16 })],
})
