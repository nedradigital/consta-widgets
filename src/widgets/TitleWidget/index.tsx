import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { Size, sizes, Title } from '@/ui/Title'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

type Data = typeof undefined

type Params = {
  title: string
  size?: Size
}

export const defaultParams: Params = { title: 'Заголовок' }

export const TitleWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { title, size },
}) => (
  <Title size={size} className={css.title}>
    {title}
  </Title>
)

export const TitleWidget = createWidget<Data, Params>({
  name: 'Заголовок',
  defaultParams,
  dataType: null,
  Content: TitleWidgetContent,
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
        <WidgetSettingsItem name="Размер">
          <select
            value={params.size}
            onChange={e => onChangeParam('size', (e.target.value as Size) || undefined)}
          >
            <option value="">--</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
      </>
    )
  },
})
