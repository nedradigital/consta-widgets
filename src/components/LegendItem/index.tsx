import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { useBaseSize } from '@/contexts'

import css from './index.css'

export const types = ['dot', 'line'] as const
export type Type = typeof types[number]

export const positions = ['top', 'left'] as const
export type Position = typeof positions[number]

export const sizes = ['xs', 's', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  children: React.ReactNode
  color: string
  type?: Type
  fontSize?: Size
  position?: Position
  lineBold?: boolean
  className?: string
  /** Обрезать текст, если он больше 2 строк */
  shouldCropText?: boolean
}

const DOT_SIZE = 12

const sizeClass = {
  xs: css.sizeXS,
  s: css.sizeS,
  m: undefined,
}

export const LegendItem: React.FC<Props> = ({
  children,
  color,
  type = 'dot',
  fontSize = 's',
  position = 'left',
  lineBold,
  className,
  shouldCropText,
}) => {
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const positionClass = type === 'dot' ? css.left : css[position]
  const dotSize = getCalculatedSizeWithBaseSize(DOT_SIZE)
  const dotStyle = type === 'dot' ? { width: dotSize, height: dotSize } : {}

  return (
    <div className={classnames(css.main, sizeClass[fontSize], positionClass, className)}>
      <div className={css.signWrapper}>
        {/*
          Эта дополнительная вложенность необходима чтобы получить возможность
          применить vertical-align к вложенному элементу, так как vertical-align
          не может примениться к элементу у которого родитель flex или inline-flex.

          Другие типы выравнивания нам не подходят потому что:
          - `align-items: center` центрирует по всей высоте и ломает отображение
            легенды с многострочным текстом;
          - `align-items: baseline` из-за невозможности применить отрицательный
            сдвиг используя margin, который необходим для размеров `s` и `xs`.
        */}
        <div
          className={classnames(css.sign, css[type], lineBold && css.isBold)}
          style={{ background: color, ...dotStyle }}
        />
      </div>
      <Text
        tag="span"
        size={fontSize}
        view="primary"
        className={classnames(css.text, shouldCropText && css.isSeparating)}
      >
        {children}
      </Text>
    </div>
  )
}
