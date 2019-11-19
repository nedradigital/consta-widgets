import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { updateBaseSize } from '@gaz/utils/lib/css'

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

  return storyFn()
})

// automatically import all files ending in *.stories.tsx
const req = require.context('@', true, /.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)

  updateBaseSize(16, window.document.body)
}

configure(loadStories, module)
