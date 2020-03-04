import React from 'react'

import classname from 'classnames'

import { useBaseSize } from '@/contexts'

import { HalfDonut } from '../Donut'

import css from './index.css'

export type Data = {
  title: string
  value: string
  subTitle?: string
  subValue?: string
}

type Props = {
  position: HalfDonut
  maxSize: number
  data: Data
}

export const Text: React.FC<Props> = ({ data, position, maxSize }) => {
  const isRightOrLeft = ['left', 'right'].includes(position)
  const isSubBlock = isRightOrLeft && data.subTitle && data.subValue

  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const paddingFromBorder = getCalculatedSizeWithBaseSize(8)

  const elements = [
    <div key="title" className={css.title}>
      {data.title}
    </div>,
    <div key="value" className={classname(css.value, data.value.length > 2 && css.isSmall)}>
      {data.value}
    </div>,
  ] as const

  return (
    <div
      className={classname(css.main, css[position])}
      style={{
        ['--padding-from-border' as string]: `${paddingFromBorder}px`,
      }}
    >
      <div
        className={css.content}
        style={{
          maxWidth: isRightOrLeft ? maxSize - paddingFromBorder : undefined,
        }}
      >
        {position === 'bottom' ? [...elements].reverse() : elements}
        {isSubBlock ? (
          <>
            <div className={css.title}>{data.subTitle}</div>
            <div className={css.subValue}>{data.subValue}</div>
          </>
        ) : (
          undefined
        )}
      </div>
    </div>
  )
}
