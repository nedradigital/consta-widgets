import React from 'react'

import classnames from 'classnames'

import { WidgetSettingsDatasetSelect } from '@/components/WidgetSettingsDatasetSelect'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import {
  BoxItem,
  BoxItemMarginSize,
  Dataset,
  DataType,
  GridItem,
  SwitchItem,
  WidgetItem,
} from '@/dashboard'
import { marginSizeValues } from '@/dashboard/size-constants'
import { getFormattedMarginName } from '@/utils/size-name-formatters'
import { themeColorLight } from '@/utils/theme'
import { isGrid, isSwitch, isWidget } from '@/utils/type-guards'
import { getWidget } from '@/utils/widgets-list'
import { OnChangeParam } from '@/utils/WidgetFactory'

import css from './index.css'

type Props<T> = {
  item: T
  datasets: readonly Dataset[]
  onChange: (newParams: T) => void
}

const marginSizes = Object.keys(marginSizeValues) as readonly BoxItemMarginSize[]

const stopDrag = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()

export const Settings = <T extends BoxItem>(props: Props<T>) => {
  return (
    <div
      className={classnames(themeColorLight, css.main)}
      onMouseDown={stopDrag}
      onMouseUp={stopDrag}
      onMouseMove={stopDrag}
    >
      <SettingsList {...props} />
    </div>
  )
}

const DatasetSelect = <T extends WidgetItem | SwitchItem>({
  datasets,
  dataType,
  onChange,
  item,
}: Props<T> & { dataType: DataType }) => {
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

const SettingsList = <T extends BoxItem>({ item, onChange, datasets }: Props<T>) => {
  const getOnChangeParamByItemType = <I extends BoxItem>(): OnChangeParam<I['params']> => (
    paramName,
    newValue
  ) =>
    onChange({
      ...item,
      params: {
        ...item.params,
        [paramName]: newValue,
      },
    })

  const onChangeCommonParam = getOnChangeParamByItemType<BoxItem>()
  const onChangeWidgetParam = getOnChangeParamByItemType<WidgetItem>()
  const onChangeGridParam = getOnChangeParamByItemType<GridItem>()

  const commonSettings = (
    <>
      <WidgetSettingsNumber
        name="Коэффициент растяжения"
        value={item.params.growRatio}
        minValue={0}
        onChange={value => onChangeCommonParam('growRatio', value)}
      />
      <WidgetSettingsSelect
        name="Отступ сверху"
        value={item.params.marginTop}
        values={marginSizes.map(size => ({
          name: getFormattedMarginName(size),
          value: size,
        }))}
        withEmptyValue
        onChange={value => onChangeCommonParam('marginTop', value)}
      />
    </>
  )

  if (isWidget(item)) {
    const { dataType, getSettings } = getWidget(item.widgetType)

    return (
      <>
        <WidgetSettingsItem name="id">{item.id}</WidgetSettingsItem>
        <DatasetSelect item={item} dataType={dataType} datasets={datasets} onChange={onChange} />
        {commonSettings}
        <WidgetSettingsText
          name="Замещающий текст"
          value={item.params.fallbackPlaceholderText}
          onChange={value => onChangeWidgetParam('fallbackPlaceholderText', value)}
        />
        {getSettings && getSettings(item.params, onChangeWidgetParam)}
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

  if (isGrid(item)) {
    return (
      <>
        {commonSettings}
        <WidgetSettingsSelect
          name="Вертикальные отступы"
          value={item.params.verticalMargin}
          values={marginSizes.map(size => ({
            name: getFormattedMarginName(size),
            value: size,
          }))}
          withEmptyValue
          onChange={value => onChangeGridParam('verticalMargin', value)}
        />
        <WidgetSettingsSelect
          name="Горизонтальные отступы"
          value={item.params.horizontalMargin}
          values={marginSizes.map(size => ({
            name: getFormattedMarginName(size),
            value: size,
          }))}
          withEmptyValue
          onChange={value => onChangeGridParam('horizontalMargin', value)}
        />
      </>
    )
  }

  return commonSettings
}
