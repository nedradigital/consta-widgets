import React from 'react'

import { Text } from '@gpn-design/uikit'

import { PositioningProps, Tooltip } from '@/components/Tooltip'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { DataMap, DataType } from '@/dashboard'
import { badgeParams, BadgeParams as Params } from '@/dashboard/widget-params'
import { Badge } from '@/ui/Badge'
import { PositionState } from '@/utils/tooltips'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.Badge
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  size: 's',
  view: 'filled',
}

export const BadgeWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { size, view, form, isMinified },
}) => {
  const { status, text, comment } = data

  const ref = React.useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState<PositionState>()

  const handleMouseEnter: React.MouseEventHandler = e => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({ x: left + width / 2, y: top + height / 2 })
  }

  const handleMouseLeave: React.MouseEventHandler = () => setTooltipPosition(undefined)

  const tooltipPositioningProps: PositioningProps = isMinified
    ? { position: tooltipPosition }
    : { anchorRef: ref }

  return (
    <>
      {comment && (
        <Tooltip isVisible={!!tooltipPosition} direction="upCenter" {...tooltipPositioningProps}>
          <Text tag="div" weight="bold" transform="uppercase" spacing="xs" view="primary">
            Комментарий:
          </Text>
          <Text className={css.tooltipContent} tag="div" view="primary">
            {comment}
          </Text>
        </Tooltip>
      )}
      <div
        ref={ref}
        className={css.main}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Badge
          wpSize={size}
          status={status}
          view={view}
          form={form}
          isMinified={isMinified}
          className={css.badge}
        >
          {text}
        </Badge>
      </div>
    </>
  )
}

export const BadgeWidget = createWidget<Data, Params>({
  id: widgetIdsByType.BadgeWidget,
  name: 'Бэдж',
  defaultParams,
  dataType,
  Content: BadgeWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsCheckbox
          name="Как кружок без текста"
          value={params.isMinified}
          onChange={value => onChangeParam('isMinified', value)}
        />
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={badgeParams.sizes.map(i => ({ name: i, value: i }))}
        />
        {!params.isMinified && (
          <>
            <WidgetSettingsSelect
              name="Вид"
              value={params.view}
              onChange={value => onChangeParam('view', value)}
              values={badgeParams.views.map(i => ({ name: i, value: i }))}
            />
            <WidgetSettingsSelect
              name="Форма"
              value={params.form}
              onChange={value => onChangeParam('form', value)}
              values={badgeParams.forms.map(i => ({ name: i, value: i }))}
              withEmptyValue
            />
          </>
        )}
      </>
    )
  },
})
