import React from 'react'

import { number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { statuses } from '../TechParamsChart'

import { TechParamsBlock } from '.'

storiesOf('components/TechParamsBlock', module)
  .addDecorator(blockCenteringDecorator())
  .add('colors with states', () => (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <TechParamsBlock
          status="normal"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
          addState="Открыт"
          addValue={18}
          addDimension="л/с"
          addName="Расход б/р на входе"
        />
        <TechParamsBlock
          status="warning"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
          addState="Открыт"
          addValue={18}
          addDimension="л/с"
          addName="Расход б/р на входе"
        />
        <TechParamsBlock
          status="danger"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
          addState="Открыт"
          addValue={18}
          addDimension="л/с"
          addName="Расход б/р на входе"
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <TechParamsBlock
          status="normal"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
        />
        <TechParamsBlock
          status="warning"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
        />
        <TechParamsBlock
          status="danger"
          state="Обсажен"
          value="150"
          dimension="атм"
          name="Давл. на стояке"
        />
      </div>
    </>
  ))
  .add('interactive', () => (
    <TechParamsBlock
      status={select('Status', statuses, statuses[0])}
      state={text('State', 'Обсажен')}
      value={text('Value', '150')}
      dimension={text('Dimension', 'атм')}
      name={text('Name', 'Давл. на стояке')}
      addState={text('Additional state', 'Открыт')}
      addValue={number('Additional value', 18)}
      addDimension={text('Additional dimension', 'л/с')}
      addName={text('Additional name', 'Расход б/р на входе')}
    />
  ))
