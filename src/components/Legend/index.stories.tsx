import React from 'react'

import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Legend } from '.'

storiesOf('components/Legend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <div style={{ width: number('wrapper width', 200) }}>
      <Legend
        direction="column"
        labelPosition="left"
        labelType="dot"
        fontSize="s"
        data={[
          {
            color: 'red',
            text: 'Красноватый текст',
          },
          {
            color: 'yellow',
            text: 'Желтоватый текст',
          },
          {
            color: 'aquamarine',
            text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
          },
          {
            color: 'purple',
            text: 'Пурпурный текст',
          },
          {
            color: 'green',
            text: 'Зеленый цвет',
          },
        ]}
      />
    </div>
  ))
