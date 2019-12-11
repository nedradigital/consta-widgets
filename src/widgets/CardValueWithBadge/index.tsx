import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { Badge } from '@/ui/Badge'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.NumberWithPercentAndStatus
type Data = DataMap[typeof dataType]

type Params = {
  title: string
  label: string
}

export const widgetId = '82748f2c-bb66-414f-a498-885fe17e3ceb'

export const defaultParams: Params = { title: 'Стоимость', label: 'млн,₽' }

export const CardValueWithBadgeContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data: { value, percentage, status },
  params: { title, label },
}) => (
  <div className={css.main}>
    <div className={css.title}>{title}</div>
    <div>
      <span className={css.value}>{value}</span>
      <Badge className={css.badge} status={status}>
        {percentage}%
      </Badge>
    </div>
    <div className={css.unit}>{label}</div>
  </div>
)

export const CardValueWithBadge = createWidget<Data, Params>({
  id: widgetId,
  name: 'Значение с процентом и статусом',
  dataType,
  defaultParams,
  Content: CardValueWithBadgeContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsText
          name="Заголовок"
          value={params.title}
          onChange={value => onChangeParam('title', value)}
        />
        <WidgetSettingsText
          name="Лэйбл"
          value={params.label}
          onChange={value => onChangeParam('label', value)}
        />
      </>
    )
  },
})
