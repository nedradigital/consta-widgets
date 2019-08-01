import { addDecorator, configure } from '@storybook/react'

import { appDecorator } from '@/utils/Storybook'

import '@/index.css'

// automatically import all files ending in *.stories.tsx
const req = require.context('../../src', true, /.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(appDecorator)

configure(loadStories, module)
