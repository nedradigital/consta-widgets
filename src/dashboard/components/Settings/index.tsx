import React from 'react'

import { WidgetSettingsDatasetSelect } from '@/components/WidgetSettingsDatasetSelect'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { sizeValues } from '@/dashboard/components/BoxItemWrapper'
import { BoxItem, BoxItemMarginSize, BoxItemParams, Dataset, DataType } from '@/dashboard/types'
import { isGrid, isSwitch, isWidget } from '@/utils/type-guards'
import { getWidget } from '@/utils/widgets-list'
import { OnChangeParam } from '@/utils/WidgetFactory'

import css from './index.css'

type Props = {
  item: BoxItem
  datasets: readonly Dataset[]
  onChange: (newParams: BoxItem) => void
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

const DatasetSelect: React.FC<Props & { dataType?: DataType }> = ({
  datasets,
  dataType,
  onChange,
  item,
}) => {
  if (isGrid(item)) {
    return null
  }

  const allowedDatasets = datasets
    .filter(d => d.type === dataType)
    .map(d => ({ value: d.id, name: d.name, groupName: d.groupName }))

  return (
    <WidgetSettingsDatasetSelect
      name="Датасет"
      value={item.params.datasetId}
      values={allowedDatasets}
      withEmptyValue
      onChange={value => onChange({ ...item, params: { ...item.params, datasetId: value } })}
    />
  )
}

const SettingsList: React.FC<Props> = ({ item, onChange, datasets }) => {
  const { params } = item

  const onChangeParam: OnChangeParam<BoxItemParams> = (paramName, newValue) =>
    onChange({
      ...item,
      params: {
        ...params,
        [paramName]: newValue,
      },
    })

  const commonSettings = (
    <>
      <WidgetSettingsNumber
        name="Коэффициент растяжения"
        value={params.growRatio}
        minValue={0}
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

    return (
      <>
        <WidgetSettingsItem name="id">{item.id}</WidgetSettingsItem>
        {dataType && (
          <DatasetSelect item={item} dataType={dataType} datasets={datasets} onChange={onChange} />
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

  if (isSwitch(item)) {
    return (
      <>
        <WidgetSettingsItem name="id">{item.id}</WidgetSettingsItem>
        <DatasetSelect
          item={item}
          dataType={DataType.Switch}
          datasets={datasets}
          onChange={onChange}
        />
        {commonSettings}
      </>
    )
  }

  return commonSettings
}
