import React from 'react'
import ReactDOM from 'react-dom'

import { Theme, ThemePreset } from '@gpn-design/uikit/Theme'

export const PortalWithTheme: React.FC<{
  theme: ThemePreset
  container?: Element
}> = ({ children, theme, container = window.document.body }) =>
  ReactDOM.createPortal(<Theme preset={theme}>{children}</Theme>, container)
