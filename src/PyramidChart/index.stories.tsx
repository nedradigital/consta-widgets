import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { DEFAULT_COLORS, PyramidChart } from './index'

export const Interactive = createStory(() => (
  <PyramidChart
    data={[
      {
        value: null,
        text: '1. Смертельные на производстве ',
      },
      {
        value: 23,
        text: '2. Уровень 1+Травмы с ВПТ',
      },
      {
        value: null,
        text: '3. Уровень 2+Мед. помощь',
      },
      {
        value: 459,
        text: '4. Первая помощь',
      },
      {
        value: 2950,
        text: '5. Происшествия без последствий',
      },
      {
        value: 12374,
        text: '6. ОД и ОУ ',
      },
    ]}
    colors={DEFAULT_COLORS}
    fontSize="m"
    constraint
  />
))

export default createMetadata({
  title: 'components/PyramidChart',
  decorators: [
    withSmartKnobs(),
    environmentDecorator({
      style: {
        width: '50vw',
      },
    }),
  ],
})
