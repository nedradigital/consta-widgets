import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  isVertical: boolean
  paddingY: number
  height: number
  width: number
  changeDisplayValues: () => void
}

export const Control: React.FC<Props> = ({
  isVertical,
  paddingY,
  height,
  width,
  changeDisplayValues,
}) => {
  const calcVerticalStyles = {
    width,
  }
  const calcHorizontalStyles = {
    left: -1 * paddingY,
    height,
    width: paddingY,
  }
  const style = isVertical ? calcVerticalStyles : calcHorizontalStyles

  return (
    <div
      className={classnames(css.control, isVertical ? css.isVertical : css.isHorizontal)}
      style={style}
    >
      <div className={css.controls}>
        <div className={css.controlGroup}>
          {isVertical ? (
            <>
              <input
                type="checkbox"
                id="control-checkbox"
                className={css.checkbox}
                onChange={changeDisplayValues}
              />
              <label htmlFor="control-checkbox" className={css.labels} />
              Показать значения секций
            </>
          ) : (
            <>
              Показать значения секций
              <input
                type="checkbox"
                id="control-checkbox"
                className={css.checkbox}
                onChange={changeDisplayValues}
              />
              <label htmlFor="control-checkbox" className={css.labels} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
