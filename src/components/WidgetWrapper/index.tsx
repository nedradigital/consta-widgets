import { useLayoutEffect, useState } from 'react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import ClickOutHandler from 'react-onclickout'

import { calcSize } from '@gaz/utils/lib/css'

import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { Dataset } from '@/dashboard/types'
import { OnChangeParam, WithDataset } from '@/utils/WidgetFactory'

import { MarginSettings, Size, sizeValues } from './components/MarginSettings'
import css from './index.css'

export type WrapperParams = WithDataset<{
  marginTop?: Size
  marginRight?: Size
  height?: number
}>

type Props = {
  children: React.ReactNode
  datasets: readonly Dataset[]
  params: WrapperParams
  onChangeParam: OnChangeParam<WrapperParams>
  additionalSettings?: React.ReactNode
  showSettings?: boolean
  requestCloseSettings: () => void
}

const stopDragWidget = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()

export const WidgetWrapper: React.FC<Props> = ({
  children,
  datasets,
  params,
  onChangeParam,
  additionalSettings,
  showSettings,
  requestCloseSettings,
}) => {
  const ref = React.createRef<HTMLDivElement>()
  const [{ left, top }, setPosition] = useState({ left: 0, top: 0 })

  let portalEl = document.querySelector(`.${css.portal}`)

  useLayoutEffect(() => {
    if (showSettings && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPosition({ left: rect.right, top: rect.top })

      if (!portalEl) {
        portalEl = document.createElement('div')
        portalEl.classList.add(css.portal)
        document.body.append(portalEl)
      }
    }
  }, [showSettings])

  return (
    <div
      style={{
        marginTop: params.marginTop && calcSize(sizeValues[params.marginTop]),
        marginRight: params.marginRight && calcSize(sizeValues[params.marginRight]),
        height: params.height ? calcSize(params.height) : undefined,
      }}
      ref={ref}
      onMouseDown={showSettings ? stopDragWidget : undefined}
      onMouseUp={showSettings ? stopDragWidget : undefined}
      onMouseMove={showSettings ? stopDragWidget : undefined}
    >
      {children}
      {showSettings &&
        portalEl &&
        ReactDOM.createPortal(
          <ClickOutHandler onClickOut={requestCloseSettings}>
            <div className={css.settings} style={{ left, top }}>
              {datasets.length ? (
                <WidgetSettingsItem name="Датасет">
                  <select
                    value={params.datasetId}
                    onChange={e => onChangeParam('datasetId', e.target.value || undefined)}
                  >
                    <option value={''}>--</option>
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </option>
                    ))}
                  </select>
                </WidgetSettingsItem>
              ) : null}
              <WidgetSettingsItem name="Высота">
                <input
                  type="number"
                  value={params.height}
                  onChange={e => onChangeParam('height', Number(e.target.value) || undefined)}
                />
              </WidgetSettingsItem>
              <MarginSettings params={params} onChangeParam={onChangeParam} />
              {additionalSettings}
            </div>
          </ClickOutHandler>,
          portalEl
        )}
    </div>
  )
}
