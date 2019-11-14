import React from 'react'

import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { getWidget } from '@/dashboard/components/Box'
import { BoxItem, BoxItemParams, Dataset } from '@/dashboard/types'
import { isWidget } from '@/utils/type-guards'
import { OnChangeParam } from '@/utils/WidgetFactory'

import { MarginSettings } from './components/MarginSettings'
import css from './index.css'

type Props = {
  item: BoxItem
  datasets: readonly Dataset[]
  onChangeParams: (newParams: BoxItemParams) => void
}

const stopDrag = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()

export const Settings: React.FC<Props> = props => {
  return (
    <div className={css.main} onMouseDown={stopDrag} onMouseUp={stopDrag} onMouseMove={stopDrag}>
      <SettingsList {...props} />
    </div>
  )
}

const SettingsList: React.FC<Props> = ({ item, onChangeParams, datasets }) => {
  const { params } = item
  const onChangeParam: OnChangeParam<BoxItemParams> = (paramName, newValue) =>
    onChangeParams({
      ...params,
      [paramName]: newValue,
    })
  const commonSettings = (
    <>
      <WidgetSettingsItem name="Коэффициент растяжения">
        <input
          type="number"
          value={params.growRatio}
          onChange={e => onChangeParam('growRatio', Number(e.target.value) || undefined)}
        />
      </WidgetSettingsItem>
      <MarginSettings params={params} onChangeParam={onChangeParam} />
    </>
  )

  if (isWidget(item)) {
    const { dataType, getSettings } = getWidget(item.widgetType)
    const allowedDatasets = datasets.filter(d => d.type === dataType)

    return (
      <>
        {dataType && (
          <WidgetSettingsItem name="Датасет">
            <select
              value={item.params.datasetId}
              onChange={e => onChangeParams({ ...params, datasetId: e.target.value || undefined })}
            >
              <option value={''}>--</option>
              {allowedDatasets.map(dataset => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </option>
              ))}
            </select>
          </WidgetSettingsItem>
        )}
        {commonSettings}
        {getSettings && getSettings(params, onChangeParam)}
      </>
    )
  }

  return commonSettings
}
