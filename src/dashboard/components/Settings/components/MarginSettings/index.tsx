import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { sizeValues } from '@/dashboard/components/BoxItemWrapper'
import { BoxItemMarginSize, BoxItemParams } from '@/dashboard/types'
import { OnChangeParam } from '@/utils/WidgetFactory'

const sizes = Object.keys(sizeValues)

type Props = {
  params: BoxItemParams
  onChangeParam: OnChangeParam<BoxItemParams>
}

export const MarginSettings: React.FC<Props> = ({ onChangeParam, params }) => {
  return (
    <>
      <WidgetSettingsItem name="Отступ сверху">
        <select
          value={params.marginTop}
          onChange={e =>
            onChangeParam('marginTop', (e.target.value as BoxItemMarginSize) || undefined)
          }
        >
          <option value={''}>--</option>
          {sizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </WidgetSettingsItem>
    </>
  )
}
