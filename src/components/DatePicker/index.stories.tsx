import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { DatePicker } from '.'

storiesOf('components/DatePicker', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
      const [date, setDate] = React.useState<Date | undefined>(new Date())

      return <DatePicker value={date} onChange={setDate} />
    }

    return <Wrapper />
  })
