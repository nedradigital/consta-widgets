import { ColorGroups } from '@/common/types'

const colorGroups: ColorGroups = {
  first: '#E5437C',
  second: '#9F0CE9',
}

export const interactiveData = {
  colorGroups,
  groups: [
    {
      groupName: 'АО Мессояханефтегаз',
      values: [{ first: 10 }, { second: 6 }],
    },
    {
      groupName: 'ООО ГПН-Оренбург',
      values: [{ first: 6 }, { second: 3 }],
    },
    {
      groupName: 'ООО ГПН-Заполярьег',
      values: [{ first: 4 }, { second: 3 }],
    },
    {
      groupName: 'ООО ГПН-Ямал',
      values: [{ first: 1 }, { second: 2 }],
    },
    {
      groupName: 'ООО ГПН-Восток',
      values: [{ first: 7 }, { second: 13 }],
    },
    {
      groupName: 'ООО Газпром-инвест',
      values: [{ first: 4 }, { second: 12 }],
    },
  ],
  unit: 'млн. руб.',
}
