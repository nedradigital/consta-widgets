import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withPropsTable } from 'storybook-addon-react-docgen'

import '@/index.css'

addDecorator(withPropsTable)
addDecorator(withKnobs)

// automatically import all files ending in *.stories.tsx
const req = require.context('../../src', true, /.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
