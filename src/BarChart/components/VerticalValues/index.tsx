import React, { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  y: number
  value: number
  columnSize: number
  columnDefaultSize: number
  className: string
}

const VERTICAL_PADDING_VALUE = 6
const VERTICAL_PADDING_VALUE_NEGATIVE = 14

export const VerticalValues: React.FC<Props> = ({
  y,
  value,
  columnSize,
  columnDefaultSize,
  className,
}: Props) => {
  const ref = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBBox().width)
    }
  }, [value, columnSize])

  const isNegative = value <= 0
  const textPositionX = columnDefaultSize / 2 - Math.trunc(width / 2)
  const textPositionY = isNegative
    ? y + columnSize + VERTICAL_PADDING_VALUE_NEGATIVE
    : y - VERTICAL_PADDING_VALUE

  return (
    <g ref={ref}>
      <text className={className} x={textPositionX} y={textPositionY}>
        {value}
      </text>
    </g>
  )
}
