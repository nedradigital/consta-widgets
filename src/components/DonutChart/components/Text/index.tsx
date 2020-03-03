import React from 'react'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

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

export const DonutText: React.FC<Props> = ({ data, position, maxSize }) => {
  const isRightOrLeft = ['left', 'right'].includes(position)
  const isSubBlock = isRightOrLeft && data.subTitle && data.subValue

  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const paddingFromBorder = getCalculatedSizeWithBaseSize(8)

  const elements = [
    <Text key="title" tag="div" size="xs" view="secondary" className={css.title}>
      {data.title}
    </Text>,
    <Text key="value" tag="div" size={data.value.length > 2 ? '3xl' : '4xl'} view="primary">
      {data.value}
    </Text>,
  ] as const

  return (
    <div
      className={classnames(css.main, css[position])}
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
            <Text tag="div" size="xs" view="secondary" className={css.title}>
              {data.subTitle}
            </Text>
            <Text tag="div" size="l" weight="bold" view="primary">
              {data.subValue}
            </Text>
          </>
        ) : (
          undefined
        )}
      </div>
    </div>
  )
}
