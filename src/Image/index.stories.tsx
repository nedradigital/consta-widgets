import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { Image } from '@/Image/index'

export const Interactive = createStory(() => (
  <Image src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg" />
))

export default createMetadata({
  title: 'components/Image',

  decorators: [
    withSmartKnobs(),
    environmentDecorator({
      scaling: false,
      style: {
        width: 600,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  ],
})
