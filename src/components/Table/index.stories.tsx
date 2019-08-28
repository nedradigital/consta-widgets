import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Cell, Row, Table } from '.'

storiesOf('components/Table', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <Table>
      <Row>
        <Cell>Диаметр</Cell>
        <Cell>214 мм</Cell>
      </Row>
      <Row>
        <Cell>Длина</Cell>
        <Cell>320 М</Cell>
      </Row>
      <Row>
        <Cell>Порты</Cell>
        <Cell>4 шт</Cell>
      </Row>
    </Table>
  ))
