import React from 'react'

import { presetGpnDisplay, Theme } from '@consta/uikit/Theme'
import { DocsContainer } from '@storybook/addon-docs/dist/blocks'

import css from './index.css'

type DocsContainerProps = React.ComponentProps<typeof DocsContainer>

export const DocsDecorator: React.FC<DocsContainerProps> = props => {
  const { children, context } = props

  return (
    <Theme preset={presetGpnDisplay} className={css.main}>
      <DocsContainer context={context}>
        <div className={css.wrapper}>{children}</div>
      </DocsContainer>
    </Theme>
  )
}
