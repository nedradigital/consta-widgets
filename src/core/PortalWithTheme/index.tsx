import React from 'react'
import ReactDOM from 'react-dom'

import { Theme, ThemeProps } from '@gpn-design/uikit/Theme'

export const PortalWithTheme: React.FC<{
  container?: Element
} & ThemeProps> = ({ children, container = window.document.body, ...rest }) =>
  ReactDOM.createPortal(<Theme {...rest}>{children}</Theme>, container)
