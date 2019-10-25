import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { WellPassport } from '.'

storiesOf('legacy/Well/Passport', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 1080 }))
  .add('interactive', () => (
    <WellPassport
      drillCompany={'{dC}'}
      geoParams={['МЗС 5ст', 'TAML-2', 'ВЗД', ' ERD 1.1', 'РУО']}
      oilFieldName={'{oFN}'}
      planDepth={'{pD}'}
      techParams={['Пласт', 'ЦИ 24.6']}
      wellId={'{wI}'}
      wellPad={'{wP}'}
    />
  ))
  .add('responsible persons', () => (
    <WellPassport
      drillCompany={'{dC}'}
      oilFieldName={'{oFN}'}
      planDepth={'{pD}'}
      wellId={'{wI}'}
      wellPad={'{wP}'}
      responsiblePersons={{
        technologist: { name: 'Петров П.П.', phone: '8(931)654-66-13' },
        geologist: { name: 'Иванов И.И.', phone: '8(931)654-67-09' },
        geonavigator: { name: 'Сидоренко С.С.', phone: '8(931)654-98-01' },
      }}
    />
  ))
  .add('responsible persons some data', () => (
    <WellPassport
      drillCompany={'{dC}'}
      oilFieldName={'{oFN}'}
      planDepth={'{pD}'}
      wellId={'{wI}'}
      wellPad={'{wP}'}
      responsiblePersons={{
        technologist: { phone: '8(931)654-66-13' },
        geologist: { name: 'Иванов И.И.' },
        geonavigator: { name: 'Сидоренко С.С.', phone: '8(931)654-98-01' },
      }}
    />
  ))
