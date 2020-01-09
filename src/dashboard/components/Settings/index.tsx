import React from 'react'

import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { getWidget } from '@/dashboard/components/Box'
import { sizeValues } from '@/dashboard/components/BoxItemWrapper'
import { BoxItem, BoxItemMarginSize, BoxItemParams, Dataset } from '@/dashboard/types'
import { isWidget } from '@/utils/type-guards'
import { OnChangeParam } from '@/utils/WidgetFactory'

import css from './index.css'

type Props = {
  item: BoxItem
  datasets: readonly Dataset[]
  onChangeParams: (newParams: BoxItemParams) => void
}

const marginSizes = Object.keys(sizeValues) as readonly BoxItemMarginSize[]

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
      <WidgetSettingsNumber
        name="Коэффициент растяжения"
        value={params.growRatio}
        onChange={value => onChangeParam('growRatio', value)}
      />
      <WidgetSettingsSelect
        name="Отступ сверху"
        value={params.marginTop}
        values={marginSizes.map(size => ({ value: size, name: size }))}
        withEmptyValue
        onChange={value => onChangeParam('marginTop', value)}
      />
    </>
  )

  if (isWidget(item)) {
    const { dataType, getSettings } = getWidget(item.widgetType)
    const allowedDatasets = datasets
      .filter(d => d.type === dataType)
      .map(d => ({ value: d.id, name: d.name }))

    return (
      <>
        <WidgetSettingsItem name="id">{item.id}</WidgetSettingsItem>
        {dataType && (
          <WidgetSettingsSelect
            name="Датасет"
            value={item.params.datasetId}
            values={allowedDatasets}
            withEmptyValue
            onChange={value => onChangeParams({ ...params, datasetId: value })}
          />
        )}
        {commonSettings}
        <WidgetSettingsText
          name="Замещающий текст"
          value={params.fallbackPlaceholderText}
          onChange={value => onChangeParam('fallbackPlaceholderText', value)}
        />
        {getSettings && getSettings(params, onChangeParam)}
      </>
    )
  }

  return commonSettings
}
