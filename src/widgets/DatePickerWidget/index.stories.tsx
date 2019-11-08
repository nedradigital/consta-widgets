import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { DatePickerWidgetContent } from '.'

storiesOf('widgets/DatePickerWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
      const [date, setDate] = React.useState<Date | undefined>(new Date())

      return (
        <DatePickerWidgetContent
          data={{
            value: date,
            onChange: setDate,
          }}
          params={object('params', {})}
        />
      )
    }

    return <Wrapper />
  })
