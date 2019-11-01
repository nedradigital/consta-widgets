import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { DateRange } from '@/components/RangePicker'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { RangePickerWidgetContent } from '.'

storiesOf('widgets/RangePickerWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => {
    const Wrapper = () => {
      const [dates, setDates] = React.useState<DateRange>([new Date(), new Date()])

      return (
        <RangePickerWidgetContent
          data={{ value: dates, onChange: setDates, onClear: () => setDates([]) }}
          params={object('params', {})}
        />
      )
    }

    return <Wrapper />
  })
