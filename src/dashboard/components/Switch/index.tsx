import React, { useState } from 'react'

import { removeAt, updateAt } from '@csssr/gpn-utils/lib/array'
import classnames from 'classnames'

import { Data, Dataset, DataType, SwitchContent } from '@/dashboard'
import { isWidget } from '@/utils/type-guards'

import { Box } from '../Box'

import css from './index.css'

export const switchId = '3cebeb3d-517a-410c-9434-c15835d30707'

type Props = {
  dataKey: string
  displays: SwitchContent
  data: Data
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (items: SwitchContent) => void
}

export const Switch: React.FC<Props> = ({
  dataKey,
  displays,
  data,
  datasets,
  viewMode,
  onChange,
}) => {
  const [number, changeNumber] = useState(0)
  const switchData = data[dataKey] as DataType.Switch
  const currentDisplay = viewMode ? switchData - 1 || 0 : number

  return (
    <div className={classnames(css.main, viewMode && css.isViewMode)}>
      {!viewMode && (
        <div className={css.buttons}>
          <button
            className={css.button}
            type="button"
            onClick={() => {
              changeNumber(number + 1 >= displays.length ? 0 : number + 1)
            }}
            children={`${number + 1} / ${displays.length}`}
            title="Изменить номер слоя"
          />
          <button
            className={css.button}
            type="button"
            onClick={() => {
              onChange([...displays, []])
            }}
            children="➕"
            title="Добавить новый слой"
          />
          {displays.length > 1 && (
            <button
              className={css.button}
              type="button"
              onClick={() => {
                onChange(removeAt(displays, number))
                const newNumber = number - 1
                changeNumber(newNumber < 0 ? 0 : newNumber)
              }}
              children="☠"
              title="Удалить текущий слой"
            />
          )}
        </div>
      )}
      <Box
        onChange={items => onChange(updateAt(displays, currentDisplay, items.filter(isWidget)))}
        datasets={datasets}
        data={data}
        items={displays[currentDisplay] || displays[0]}
        viewMode={viewMode}
        parentName="switch"
      />
    </div>
  )
}
