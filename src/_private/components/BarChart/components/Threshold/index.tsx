import React from 'react'

import { Scaler } from '@/_private/utils/scale'

import css from './index.css'

type Props = {
  valuesScale: Scaler<number>
  isHorizontal: boolean
  value: number
  color: string
}

const getLinePosition = (value: number, isHorizontal: boolean) => {
  if (isHorizontal) {
    return {
      x1: value,
      x2: value,
      y1: '0%',
      y2: '100%',
    }
  }

  return {
    x1: '0%',
    x2: '100%',
    y1: value,
    y2: value,
  }
}

export const Threshold: React.FC<Props> = ({ valuesScale, isHorizontal, value, color }) => {
  const scaledValue = valuesScale.scale(value)
  const linePos = getLinePosition(scaledValue, isHorizontal)

  return <line stroke={color} className={css.main} {...linePos} />
}
