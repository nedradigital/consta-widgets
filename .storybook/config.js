import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { updateBaseSize } from '@csssr/gpn-utils/lib/css'
import '@gpn-design/uikit/dist/style.css'

import '@/index.css'

addDecorator(withPropsTable)
addDecorator(withKnobs)
addDecorator(
  withInfo({
    header: false,
  })
)
addDecorator(storyFn => {
  window.document.documentElement.lang = 'ru'

  document.body.classList.add(
    'theme',
    'theme_breakpoint_default',
    'theme_control_gpn-default',
    'theme_font_small',
    'theme_gap_small',
    'theme_size_gpn-default',
    'theme_space_gpn-default',
  )

  return storyFn()
})

// automatically import all files ending in *.stories.tsx
const req = require.context('@', true, /.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)

  updateBaseSize(16, window.document.body)
}

configure(loadStories, module)
