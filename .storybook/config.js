import { addDecorator, configure, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { updateBaseSize } from '@csssr/gpn-utils/lib/css'
import { themes } from '@storybook/theming';
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
    page: stub,
  },
  options: {
    theme: themes.dark,
    showRoots: true,
  }
});

function loadStories() {
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

  return [
    require.context('../docs', true, /\.mdx$/),
    require.context('../src', true, /index.stories\.tsx$/),
  ];
}

configure(loadStories(), module)
