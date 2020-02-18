import React, { useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ClickOutHandler from 'react-onclickout'

import { calcSize } from '@csssr/gpn-utils/lib/css'
import classnames from 'classnames'

import { BoxItem } from '@/dashboard'
import { BoxItemMarginSize } from '@/dashboard/types'

import css from './index.css'

export const sizeValues: { [key in BoxItemMarginSize]: number } = {
  xl: 24,
  l: 20,
  m: 16,
  s: 12,
  xs: 8,
  '2xs': 4,
}

type Props = {
  debugName: string
  viewMode: boolean
  lastElement: boolean
  isEditingSettings: boolean
  isCustomItem: boolean
  index: number
  params: BoxItem['params']
  settings: React.ReactNode
  onChangePosition: (index: number, direction: 1 | -1) => void
  onRemoveItem: (index: number) => void
  onOpenSettings: (index?: number) => void
}

export const BoxItemWrapper: React.FC<Props> = ({
  children,
  settings,
  viewMode,
  index,
  onChangePosition,
  lastElement,
  onRemoveItem,
  onOpenSettings,
  isEditingSettings,
  isCustomItem,
  params,
  debugName,
}) => {
  const ref = React.createRef<HTMLDivElement>()
  const [{ left, top }, setPosition] = useState({ left: 0, top: 0 })

  let portalEl = document.querySelector(`.${css.portal}`)

  useLayoutEffect(() => {
    if (isEditingSettings && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPosition({ left: rect.right, top: rect.top })

      if (!portalEl) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        portalEl = document.createElement('div')
        portalEl.classList.add(css.portal)
        document.body.append(portalEl)
      }
    }
  }, [isEditingSettings])

  return (
    <div
      className={classnames(
        css.main,
        viewMode && css.isViewMode,
        isEditingSettings && css.isEditingSettings,
        isCustomItem && css.isCustomItem
      )}
      style={{
        flexGrow: params.growRatio,
        flexBasis: params.growRatio ? 0 : undefined,
        marginTop: params.marginTop && calcSize(sizeValues[params.marginTop]),
      }}
      ref={ref}
    >
      {!viewMode && (
        <>
          <div className={css.editButtons}>
            <button
              className={css.button}
              type="button"
              children="✏️"
              onClick={() => onOpenSettings(index)}
              title={`Настройки виджета "${debugName}"`}
            />
            <button
              className={css.button}
              type="button"
              children="💀"
              onClick={() => onRemoveItem(index)}
              title={`Удалить виджет "${debugName}"`}
            />
            {index > 0 ? (
              <button
                className={css.button}
                type="button"
                onClick={() => onChangePosition(index, -1)}
                children="⬆️"
                title="Переместить виджет выше"
              />
            ) : null}
            {!lastElement ? (
              <button
                className={css.button}
                type="button"
                onClick={() => onChangePosition(index, 1)}
                children="⬇️"
                title="Переместить виджет ниже"
              />
            ) : null}
          </div>
        </>
      )}

      <div className={css.content}>{children}</div>

      {isEditingSettings &&
        portalEl &&
        ReactDOM.createPortal(
          <ClickOutHandler onClickOut={() => onOpenSettings(undefined)}>
            {}
            <div className={css.settings} style={{ left, top }}>
              {settings}
            </div>
          </ClickOutHandler>,
          portalEl
        )}
    </div>
  )
}
