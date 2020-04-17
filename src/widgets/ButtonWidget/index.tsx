import React, { useRef, useState } from 'react'

import { Button } from '@gpn-design/uikit'

import { Tooltip } from '@/components/Tooltip'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard'
import { buttonParams, ButtonParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.Button
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
  size: 's',
  view: 'primary',
  width: 'auto',
  form: 'default',
}

export const ButtonWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { content, form, size, view, width, withIcon },
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setIsTooltipVisible(false)
  }

  return (
    <>
      <div
        className={css.wrapper}
        ref={wrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          type="button"
          disabled={data && data.disabled}
          wpSize={size}
          onClick={data && data.onClick}
          view={view}
          width={width}
          form={form}
          iconOnly={data && data.iconOnly}
          withIcon={withIcon}
        >
          {data && data.content ? data.content : content}
        </Button>
      </div>
      {data.tooltip && (
        <Tooltip anchorRef={wrapperRef} isVisible={isTooltipVisible}>
          {data.tooltip}
        </Tooltip>
      )}
    </>
  )
}

export const ButtonWidget = createWidget<Data, Params>({
  id: widgetIdsByType.ButtonWidget,
  name: 'Кнопка',
  defaultParams,
  dataType: DataType.Button,
  Content: ButtonWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          values={buttonParams.sizes.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('size', value)}
        />
        <WidgetSettingsSelect
          name="Вид"
          value={params.view}
          values={buttonParams.views.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('view', value)}
        />
        <WidgetSettingsSelect
          name="Ширина"
          value={params.width}
          values={buttonParams.widths.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('width', value)}
        />
        <WidgetSettingsSelect
          name="Форма"
          value={params.form}
          values={buttonParams.forms.map(i => ({ value: i, name: i }))}
          onChange={value => onChangeParam('form', value)}
        />
        <WidgetSettingsText
          name="Текст"
          value={params.content}
          onChange={value => onChangeParam('content', value)}
        />
        <b>Если есть иконка:</b>
        <WidgetSettingsSelect
          name="Расположение иконки"
          value={params.withIcon}
          values={buttonParams.iconAligns.map(item => ({ value: item, name: item || '--' }))}
          withEmptyValue
          onChange={value => onChangeParam('withIcon', value)}
        />
      </>
    )
  },
})
