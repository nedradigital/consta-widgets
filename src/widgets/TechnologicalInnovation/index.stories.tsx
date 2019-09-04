import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechnologicalInnovation } from '.'

const data = [
  {
    text: 'Предиктивное моделирование пластов',
    label: 'Research',
  },
  {
    text: 'Визуализация процессов бурения',
    label: 'Test',
  },
  {
    text: 'Система «Виртуальный бурильщик»',
    label: 'MVP',
  },
]

storiesOf('widgets/TechnologicalInnovation', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <TechnologicalInnovation data={data} />)
