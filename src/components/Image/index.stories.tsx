import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { Image } from '@/components/Image/index'
import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

storiesOf('components/Image', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(
    blockCenteringDecorator({
      width: 600,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
  )
  .add('interactive', () => <Image src={getWidgetMockData(DataType.Image)} />)
