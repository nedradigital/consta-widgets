import React from 'react'

import { array, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellPassport } from '.'

storiesOf('components/WellPassport', module)
  .addDecorator(blockCenteringDecorator({ width: 1080 }))
  .add('interactive', () => (
    <WellPassport
      drillCompany={text('drillCompany', '{dC}')}
      geoParams={array('geoParams', ['МЗС 5ст', 'TAML-2', 'ВЗД', ' ERD 1.1', 'РУО'])}
      oilFieldName={text('oilFieldName', '{oFN}')}
      planDepth={text('planDepth', '{pD}')}
      techParams={['Пласт', 'ЦИ 24.6']}
      wellId={text('wellId', '{wI}')}
      wellPad={text('wellPad', '{wP}')}
    />
  ))
  .add('responsible persons', () => (
    <WellPassport
      drillCompany={text('drillCompany', '{dC}')}
      oilFieldName={text('oilFieldName', '{oFN}')}
      planDepth={text('planDepth', '{pD}')}
      wellId={text('wellId', '{wI}')}
      wellPad={text('wellPad', '{wP}')}
      responsiblePersons={{
        technologist: { name: 'Петров П.П.', phone: '8(931)654-66-13' },
        geologist: { name: 'Иванов И.И.', phone: '8(931)654-67-09' },
        geonavigator: { name: 'Сидоренко С.С.', phone: '8(931)654-98-01' },
      }}
    />
  ))
  .add('responsible persons some data', () => (
    <WellPassport
      drillCompany={text('drillCompany', '{dC}')}
      oilFieldName={text('oilFieldName', '{oFN}')}
      planDepth={text('planDepth', '{pD}')}
      wellId={text('wellId', '{wI}')}
      wellPad={text('wellPad', '{wP}')}
      responsiblePersons={{
        technologist: { phone: '8(931)654-66-13' },
        geologist: { name: 'Иванов И.И.' },
        geonavigator: { name: 'Сидоренко С.С.', phone: '8(931)654-98-01' },
      }}
    />
  ))
