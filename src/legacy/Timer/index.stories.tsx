import { subtractTime } from '@gaz/utils/lib/time'
import { date } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Timer } from '.'

storiesOf('legacy/Timer', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Timer startTime={date('startTime', subtractTime(new Date(), 0, 9, 59.8))} />
  ))
