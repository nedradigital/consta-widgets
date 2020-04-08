import { useLayoutEffect, useRef, useState } from 'react'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'
import { endOfDay, format, startOfDay } from 'date-fns'

import { Tooltip } from '@/components/Tooltip'
import { themeColorLight } from '@/utils/theme'

import { ActionButtons } from './components/ActionButtons'
import { Calendar } from './components/Calendar'
import { InputDate } from './components/InputDate'
import { Timeline } from './components/Timeline'
import { getCurrentVisibleDate, isDateIsInvalid, isDateRange } from './helpers'
// TODO: использовать иконку из UI-кита https://jira.csssr.io/browse/GDC-36
import { ReactComponent as IconWarning } from './images/icon_warning.svg'
import css from './index.css'

export type DateRange = readonly [Date?, Date?]

export const sizes = ['s', 'm', 'l'] as const
export type Size = typeof sizes[number]

export type StyleProps = {
  size?: Size
}

type BaseProps = {
  minDate: Date
  maxDate: Date
}

type RenderControls<V> = (
  props: {
    value?: V
    onChange: (value?: V) => void
    isInvalid: boolean
    tooltipContent?: React.ReactNode
    isCalendarOpened: boolean
  } & StyleProps
) => React.ReactNode

type SingleProps = {
  type: 'date'
  value?: Date
  onChange: (value?: Date) => void
  renderControls?: RenderControls<Date>
}

type RangeProps = {
  type: 'date-range'
  value?: DateRange
  onChange: (value?: DateRange) => void
  renderControls?: RenderControls<DateRange>
}

export type Data = BaseProps & (SingleProps | RangeProps)

type Props = BaseProps & StyleProps & (SingleProps | RangeProps)

const OFFSET_FROM_CONTROLS = 4

const formatOutOfRangeDate = (date: Date) => format(date, 'dd.MM.yyyy')

const DateOutOfRangeTooptipContent: React.FC<BaseProps> = ({ minDate, maxDate }) => {
  return (
    <div className={css.warningTooltip}>
      <IconWarning className={css.iconWarning} />
      <Text tag="div" size="xs" view="primary" lineHeight="m">
        Укажите дату в промежутке {formatOutOfRangeDate(minDate)} - {formatOutOfRangeDate(maxDate)}
      </Text>
    </div>
  )
}

const defaultRenderSingleControl: RenderControls<Date> = props => {
  return <InputDate {...props} />
}

const defaultRenderRangeControls: RenderControls<DateRange> = props => {
  const { value, onChange, tooltipContent, ...commonProps } = props
  const [startDate, endDate] = value || [undefined, undefined]

  return (
    <div className={css.controls}>
      <InputDate {...commonProps} value={startDate} onChange={date => onChange([date, endDate])} />
      <Text tag="span" view="primary" className={css.delimiter}>
        –
      </Text>
      <InputDate
        {...commonProps}
        value={endDate}
        onChange={date => onChange([startDate, date])}
        tooltipContent={tooltipContent}
      />
    </div>
  )
}

export const DatePicker: React.FC<Props> = props => {
  const { minDate: sourceMinDate, maxDate: sourceMaxDate, size } = props
  const minDate = startOfDay(sourceMinDate)
  const maxDate = endOfDay(sourceMaxDate)

  const controlsRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [currentVisibleDate, setCurrentVisibleDate] = useState<Date>(
    getCurrentVisibleDate({ value: props.value, minDate, maxDate })
  )
  const [currentValue, changeCurrentValue] = useState(props.value)

  const handleApplyDate = () => {
    if (currentValue) {
      if (!isDateRange(currentValue) && props.type === 'date') {
        props.onChange(currentValue)
      }

      if (isDateRange(currentValue) && props.type === 'date-range') {
        props.onChange(currentValue)
      }
    }

    setIsTooltipVisible(false)
  }

  const handleSelectDate = (value: Date | DateRange) => {
    if (!isDateRange(value) && props.type === 'date') {
      return changeCurrentValue(value)
    }

    if (isDateRange(value) && props.type === 'date-range') {
      return changeCurrentValue(value)
    }
  }

  useClickOutside({
    requiredRefs: [controlsRef, tooltipRef],
    handler: handleApplyDate,
  })

  useLayoutEffect(() => {
    // сброс интервала в случае, если сторонним инпутом сброшена только первая дата
    if (props.type === 'date-range' && props.value && props.value[1] && !props.value[0]) {
      props.onChange([undefined, undefined])
    }

    if (!isTooltipVisible) {
      setCurrentVisibleDate(getCurrentVisibleDate({ value: props.value, minDate, maxDate }))
    }

    changeCurrentValue(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, isTooltipVisible])

  const renderControls = () => {
    const isInvalid =
      props.type === 'date'
        ? isDateIsInvalid({ date: props.value, minDate: props.minDate, maxDate: props.maxDate })
        : !!props.value &&
          props.value.some(date =>
            isDateIsInvalid({ date, minDate: props.minDate, maxDate: props.maxDate })
          )
    const tooltipContent = isInvalid && !isTooltipVisible && (
      <DateOutOfRangeTooptipContent minDate={props.minDate} maxDate={props.maxDate} />
    )
    const commonProps = { size, isInvalid, tooltipContent }

    if (props.type === 'date') {
      const renderSingle = props.renderControls || defaultRenderSingleControl

      return renderSingle({
        ...commonProps,
        isCalendarOpened: isTooltipVisible,
        value: props.value,
        onChange: props.onChange,
      })
    }

    const renderRange = props.renderControls || defaultRenderRangeControls

    return renderRange({
      ...commonProps,
      isCalendarOpened: isTooltipVisible,
      value: props.value,
      onChange: props.onChange,
    })
  }

  return (
    <div>
      <div ref={controlsRef} onClick={() => setIsTooltipVisible(!isTooltipVisible)}>
        {renderControls()}
      </div>
      <Tooltip
        isVisible={isTooltipVisible}
        ref={tooltipRef}
        anchorRef={controlsRef}
        className={classnames(
          themeColorLight,
          css.tooltip,
          props.type === 'date-range' && css.isWide
        )}
        withArrow={false}
        offset={OFFSET_FROM_CONTROLS}
        direction="downRight"
        isContentHoverable
      >
        <Timeline
          currentVisibleDate={currentVisibleDate}
          minDate={minDate}
          maxDate={maxDate}
          value={currentValue}
          onChange={setCurrentVisibleDate}
        />
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          value={currentValue}
          currentVisibleDate={currentVisibleDate}
          onSelect={handleSelectDate}
        />
        <ActionButtons
          showQuartersSelector={props.type === 'date-range'}
          minDate={minDate}
          maxDate={maxDate}
          currentVisibleDate={currentVisibleDate}
          onApply={handleApplyDate}
          onSelect={handleSelectDate}
        />
      </Tooltip>
    </div>
  )
}
