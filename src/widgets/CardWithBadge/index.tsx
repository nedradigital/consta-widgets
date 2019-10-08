import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { Badge } from '@/ui/Badge'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

type Data = typeof undefined

type Params = {
  text: string
  label: string
}

export const defaultParams: Params = {
  text: 'Предиктивное моделирование пластов',
  label: 'Research',
}

export const widgetId = '47286da3-876c-472e-ba7f-9afdd171ae15'

export const CardWithBadgeContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { text, label },
}) => (
  <div className={css.main}>
    <div className={css.text}>{text}</div>
    <Badge className={css.label}>{label}</Badge>
  </div>
)

export const CardWithBadge = createWidget<Data, Params>({
  id: widgetId,
  name: 'Карточка с бэйджем',
  dataType: null,
  defaultParams,
  Content: CardWithBadgeContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Текст">
          <input
            type="text"
            value={params.text}
            onChange={e => onChangeParam('text', e.target.value)}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Бэдж">
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
