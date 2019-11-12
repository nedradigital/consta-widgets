import React from 'react'

import { boolean, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { RadarChart } from './'

storiesOf('components/RadarChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '50vw', height: '60vh' } as React.CSSProperties))
  .add('interactive', () => (
    <RadarChart
      colorGroups={object('colorGroups', {
        mainCharacter: '#fff',
        partyMember: '#56B9F2',
      })}
      axesLabels={{
        strength: 'Сила сила сила сила сила сила сила сила сила сила сила сила сила',
        endurance: 'Выносливая выносливость',
        charisma: 'Харизма',
        intelligence: 'Гиперинтеллектуальный интеллект',
        agility: 'Ловкость',
      }}
      maxValue={10}
      figures={[
        {
          colorGroupName: 'mainCharacter',
          values: [
            { axisName: 'strength', value: 10 },
            { axisName: 'endurance', value: 9 },
            { axisName: 'charisma', value: 2 },
            { axisName: 'intelligence', value: 1 },
            { axisName: 'agility', value: 3 },
          ],
        },
        {
          colorGroupName: 'partyMember',
          values: [
            { axisName: 'strength', value: 2 },
            { axisName: 'endurance', value: 4 },
            { axisName: 'charisma', value: 8 },
            { axisName: 'intelligence', value: 9 },
            { axisName: 'agility', value: 2 },
          ],
        },
      ]}
      ticks={4}
      backgroundColor="var(--bg-color)"
      formatLabel={
        boolean('format labels as percents', false) ? v => `${Math.round(v)}%` : undefined
      }
      withConcentricColor={false}
      labelSize="s"
    />
  ))
