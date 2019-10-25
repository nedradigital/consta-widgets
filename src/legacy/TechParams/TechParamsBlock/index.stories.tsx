import React from 'react'

import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { TechParamsBlock } from '.'

storiesOf('legacy/TechParams/Block', module)
  .addDecorator(withSmartKnobs())
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
      state={'Обсажен'}
      value={text('value', '150')}
      dimension={'атм'}
      name={'Давл. на стояке'}
      addState={'Открыт'}
      addValue={18}
      addDimension={'л/с'}
      addName={'Расход б/р на входе'}
    />
  ))
