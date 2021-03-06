import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { addDecorator, addParameters } from '@storybook/react'
import { themes } from '@storybook/theming'
import { withPropsTable } from 'storybook-addon-react-docgen'

import { environmentDecorator, listOfThemes, ThemeDecorator } from '@/_private/storybook'
import { DocsDecorator } from '@/_private/storybook/decorators/DocsContainer'

import stub from './stub.mdx'

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
    container: DocsDecorator,
    page: stub,
  },
  options: {
    theme: themes.dark,
    showRoots: true,
  },
})

window.document.documentElement.lang = 'ru'
