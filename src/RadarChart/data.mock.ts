import { Figure } from './'

export const axesLabels = {
  strength: 'Сила сила сила сила сила сила сила сила сила сила сила сила сила',
  endurance: 'Выносливая выносливость',
  charisma: 'Харизма',
  intelligence: 'Гиперинтеллектуальный интеллект',
  agility: 'Ловкость',
  persistence: 'Упорство',
  mobility: 'Мобильность',
  speed: 'Скорость',
  profit: 'Прибыльность',
}

const colors = {
  mainCharacter: 'var(--color-bg-success)',
  partyMember: 'var(--color-bg-normal)',
}

export const emptyFigures: readonly Figure[] = [
  {
    color: colors.mainCharacter,
    name: 'Северный бур',
    values: [
      { axisName: 'strength', value: 5 },
      { axisName: 'endurance', value: 8 },
      { axisName: 'charisma', value: 4 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: null },
      { axisName: 'persistence', value: null },
      { axisName: 'mobility', value: 8 },
      { axisName: 'speed', value: 4 },
      { axisName: 'profit', value: 10 },
    ],
  },
  {
    color: colors.partyMember,
    name: 'Южное месторождение',
    values: [
      { axisName: 'strength', value: 10 },
      { axisName: 'endurance', value: 4 },
      { axisName: 'charisma', value: 8 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: 2 },
      { axisName: 'persistence', value: 6 },
      { axisName: 'mobility', value: null },
      { axisName: 'speed', value: 7 },
      { axisName: 'profit', value: 9 },
    ],
  },
]

export const figures: readonly Figure[] = [
  {
    color: colors.mainCharacter,
    name: 'Северный бур',
    values: [
      { axisName: 'strength', value: 10 },
      { axisName: 'endurance', value: 9 },
      { axisName: 'charisma', value: 2 },
      { axisName: 'intelligence', value: 1 },
      { axisName: 'agility', value: 3 },
      { axisName: 'persistence', value: 7 },
      { axisName: 'mobility', value: 5 },
      { axisName: 'speed', value: 2 },
      { axisName: 'profit', value: 8 },
    ],
  },
  {
    color: colors.partyMember,
    name: 'Южное месторождение',
    values: [
      { axisName: 'strength', value: 2 },
      { axisName: 'endurance', value: 4 },
      { axisName: 'charisma', value: 8 },
      { axisName: 'intelligence', value: 9 },
      { axisName: 'agility', value: 2 },
      { axisName: 'persistence', value: 7 },
      { axisName: 'mobility', value: 1 },
      { axisName: 'speed', value: 3 },
      { axisName: 'profit', value: 3 },
    ],
  },
]
