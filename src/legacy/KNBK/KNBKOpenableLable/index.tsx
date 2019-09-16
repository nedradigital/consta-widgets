import React, { useState } from 'react'

import { isNil } from 'lodash'

import { OpenableLabel } from '@/legacy/OpenableLabel'
import { Switcher } from '@/legacy/Switcher'
import { Cell, Row } from '@/legacy/Table'

type SensorType = {
  /* Ключ параметра */
  key?: string

  /* Аббревиатура название датчика. Имя параметра */
  title?: string

  /* Значение */
  value?: number
}

type Props = {
  /* Массив значений датчиков по глубине */
  absoluteValues?: readonly SensorType[]

  /* Диаметр долота */
  bitDiameter?: number

  /* Массив значений относительно долота */
  relativeValues?: readonly SensorType[]
}

export const KNBKOpenableLabel: React.FC<Props> = ({
  absoluteValues,
  bitDiameter,
  relativeValues,
}) => {
  const [isAbsolute, toggleAbsolute] = useState(false)

  const hasValues =
    (absoluteValues && Boolean(absoluteValues.length)) ||
    (relativeValues && Boolean(relativeValues.length))
  const values = isAbsolute ? absoluteValues : relativeValues

  return (
    <OpenableLabel
      title="КНБК"
      shortTitle="КНБК"
      items={[
        <>
          {hasValues &&
            (values && values.length ? (
              values.map(({ key, title, value }, index) => (
                <Row key={key || index}>
                  <Cell isOneLine>{isNil(title) ? '--' : title}</Cell>
                  <Cell>{isNil(value) ? '--' : value}</Cell>
                </Row>
              ))
            ) : (
              <Row>
                <Cell>--</Cell>
                <Cell>--</Cell>
              </Row>
            ))}
        </>,
        <>
          Долото
          <br />Ø {isNil(bitDiameter) ? '--' : bitDiameter} мм
        </>,
        <>
          {hasValues && (
            <Switcher
              title="Абсолют."
              isEnabled={isAbsolute}
              onClick={() => {
                toggleAbsolute(!isAbsolute)
              }}
            />
          )}
        </>,
      ]}
    />
  )
}
