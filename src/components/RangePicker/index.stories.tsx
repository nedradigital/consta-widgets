import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { DateRange, RangePicker } from '.'

storiesOf('components/RangePicker', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
      const [date, setDate] = React.useState<DateRange>([new Date(), new Date()])

      return <RangePicker value={date} onChange={setDate} onClear={() => setDate([])} />
    }

    return <Wrapper />
  })
