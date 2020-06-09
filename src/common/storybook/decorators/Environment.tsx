import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { number, text } from '@storybook/addon-knobs'
import { DecoratorFn } from '@storybook/react'

import { BaseSizeProvider } from '@/BaseSizeContext'

export const ENVIRONMENT_GROUP_ID = 'environment'

const CENTERING_STYLES: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  maxWidth: '100%',
  minHeight: '100vh',
}

const getValue = (value?: number | string) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

type DecoratorParams = {
  scaling?: boolean
  style?: React.CSSProperties
}

export const environmentDecorator = (params: DecoratorParams = {}): DecoratorFn => storyFn => {
  const { scaling = true, style = {} } = params

  const baseSize = scaling ? number('base-size', 16, undefined, ENVIRONMENT_GROUP_ID) : undefined
  const width = style.width ? text('width', getValue(style.width), ENVIRONMENT_GROUP_ID) : undefined
  const height = style.height
    ? text('height', getValue(style.height), ENVIRONMENT_GROUP_ID)
    : undefined

  const content = (
    <div style={CENTERING_STYLES}>
      <div style={{ ...style, width, height }}>{storyFn()}</div>
    </div>
  )

  return isDefined(baseSize) ? (
    <BaseSizeProvider value={baseSize}>{content}</BaseSizeProvider>
  ) : (
    content
  )
}
