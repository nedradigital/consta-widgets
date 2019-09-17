import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
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
  name: 'Значение с процентом и статусом',
  dataType,
  defaultParams,
  Content: CardValueWithBadgeContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Заголовок">
          <input
            type="text"
            value={params.title}
            onChange={e => onChangeParam('title', e.target.value)}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Лэйбл">
          <input
            type="text"
            value={params.label}
            onChange={e => onChangeParam('label', e.target.value)}
          />
        </WidgetSettingsItem>
      </>
    )
  },
})
