import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { KNBKOpenableLabel } from '.'

const data = {
  bitDiameter: 122,
  absoluteValues: [
    { key: 'NK', title: 'НК', value: 20.5 },
    { key: 'KM', title: 'КМ', value: 18.2 },
    { key: 'GGK', title: 'ГГК', value: 12.2 },
    { key: 'OIK', title: 'О ИК', value: 2.2 },
    { key: 'GK', title: 'ГК', value: 12.1 },
    { key: 'RZATR', title: 'Р затр.', value: 1 },
    { key: 'KS', title: 'КС', value: 1.2 },
    { key: 'DIK', title: 'Д ИК', value: undefined },
  ],
  relativeValues: [
    { key: 'NK', title: 'НК', value: 111 },
    { key: 'KM', title: 'КМ', value: 212 },
    { key: 'GGK', title: 'ГГК', value: 234.1 },
    { key: 'OIK', title: 'О ИК', value: 12 },
    { key: 'GK', title: 'ГК', value: 121.1 },
    { key: 'RZATR', title: 'Р затр.', value: undefined },
    { key: 'KS', title: 'КС', value: 101.11 },
    { key: 'DIK', title: 'Д ИК', value: undefined },
  ],
}

storiesOf('legacy/KNBK/OpenableLabel', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('has data', () => <KNBKOpenableLabel {...data} />)
  .add('empty data', () => <KNBKOpenableLabel absoluteValues={[]} relativeValues={[]} />)
  .add('undefined data', () => <KNBKOpenableLabel />)
