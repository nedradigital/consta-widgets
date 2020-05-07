import { updateBaseSize } from '@csssr/gpn-utils/lib/css'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { addDecorator, addParameters } from '@storybook/react'
import { themes } from '@storybook/theming';
import { withPropsTable } from 'storybook-addon-react-docgen'

import stub from './stub.mdx'

import '@gpn-design/uikit/dist/style.css'
import '@/index.css'
import './storybook.css'

addDecorator(withPropsTable)
addDecorator(withKnobs)
addDecorator(
  withInfo({
    header: false,
  })
)

addParameters({
  docs: {
    container: DocsContainer,
    page: stub,
  },
  options: {
    theme: themes.dark,
    showRoots: true,
  }
});

updateBaseSize(16, window.document.body)

window.document.documentElement.lang = 'ru'

window.document.body.classList.add(
  'theme',
  'theme_breakpoint_default',
  'theme_control_gpn-default',
  'theme_font_default',
  'theme_gap_small',
  'theme_size_gpn-default',
  'theme_space_gpn-default',
  'theme_color_gpn-display',
)
