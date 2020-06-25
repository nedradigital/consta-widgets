import { updateBaseSize } from '@csssr/gpn-utils/lib/css'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { addDecorator, addParameters } from '@storybook/react'
import { themes } from '@storybook/theming'
import { withPropsTable } from 'storybook-addon-react-docgen'

import stub from './stub.mdx'

import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_font/Theme_font_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_gap/Theme_gap_m.css'

import { Theme, presetGpnDisplay } from '@gpn-design/uikit/Theme'

import './storybook.css'

addDecorator(withPropsTable)
addDecorator(withKnobs)
addDecorator(
  withInfo({
    header: false,
  })
)
addDecorator(storyFn => {
  return (
    <Theme preset={presetGpnDisplay} style={{ background: 'var(--color-bg-default)' }}>
      {storyFn()}
    </Theme>
  )
})

addParameters({
  docs: {
    container: DocsContainer,
    page: stub,
  },
  options: {
    theme: themes.dark,
    showRoots: true,
  },
})

updateBaseSize(16, window.document.body)

window.document.documentElement.lang = 'ru'
