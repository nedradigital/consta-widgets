import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Image } from '@/components/Image/index'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

export const Interactive = createStory(() => (
  <Image src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg" />
))

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
