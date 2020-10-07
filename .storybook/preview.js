import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { addDecorator, addParameters } from '@storybook/react'
import { themes } from '@storybook/theming'
import { withPropsTable } from 'storybook-addon-react-docgen'

import { environmentDecorator, listOfThemes, ThemeDecorator } from '@/_private/storybook'

import stub from './stub.mdx'

import '@consta/uikit/__internal__/src/components/Theme/Theme.css'
import '@consta/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css'
import '@consta/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css'
import '@consta/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css'
import '@consta/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css'
import '@consta/uikit/__internal__/src/components/Theme/_font/Theme_font_gpnDefault.css'
import '@consta/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css'
import '@consta/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css'

import './storybook.css'

addDecorator(withPropsTable)
addDecorator(withKnobs)
addDecorator(environmentDecorator())
addDecorator(
  withInfo({
    header: false,
  })
)

addParameters({
  themes: {
    list: listOfThemes,
    Decorator: ThemeDecorator,
  },
  docs: {
    container: DocsContainer,
    page: stub,
  },
  options: {
    theme: themes.dark,
    showRoots: true,
  },
})

window.document.documentElement.lang = 'ru'
