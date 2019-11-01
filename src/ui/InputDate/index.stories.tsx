import React from 'react'

import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { InputDate } from '.'

storiesOf('ui/InputDate', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
      const [date, setDate] = React.useState(new Date())
      return <InputDate value={date} onChange={setDate} />
    }

    return <Wrapper />
  })
