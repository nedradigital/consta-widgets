import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { Cell, Row, Table } from '.'

storiesOf('legacy/Table', module)
  .addDecorator(withSmartKnobs())
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
