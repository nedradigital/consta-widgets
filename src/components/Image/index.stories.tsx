import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Image } from '@/components/Image/index'
import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

export const Interactive = createStory(() => <Image src={getWidgetMockData(DataType.Image)} />)

export default createMetadata({
  title: 'components/Image',

  decorators: [
    withSmartKnobs(),
    blockCenteringDecorator({
      width: 600,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ],
})
