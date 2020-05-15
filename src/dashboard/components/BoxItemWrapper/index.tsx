import { calcSize } from '@csssr/gpn-utils/lib/css'
import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { BoxItem } from '@/dashboard'
import { marginSizeValues } from '@/dashboard/size-constants'

import css from './index.css'

type Props = {
  debugName: string
  viewMode: boolean
  lastElement: boolean
  isEditingSettings: boolean
  customItemName?: 'grid' | 'switch'
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
  customItemName,
  params,
  debugName,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef(null)

  useClickOutside({
    isActive: isEditingSettings,
    ignoreClicksInsideRefs: [tooltipRef],
    handler: () => onOpenSettings(undefined),
  })

  return (
    <div
      className={classnames(
        css.main,
        viewMode && css.isViewMode,
        isEditingSettings && css.isEditingSettings,
        customItemName && css.isCustomItem,
        customItemName &&
          {
            switch: css.isSwitch,
            grid: css.isGrid,
          }[customItemName]
      )}
      style={{
        flexGrow: params.growRatio,
        flexBasis: params.growRatio ? 0 : undefined,
        marginTop: params.marginTop && calcSize(marginSizeValues[params.marginTop]),
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

      <Tooltip
        isVisible={isEditingSettings}
        anchorRef={ref}
        ref={tooltipRef}
        possibleDirections={['downLeft', 'downCenter', 'downRight']}
        isContentHoverable
      >
        {settings}
      </Tooltip>
    </div>
  )
}
