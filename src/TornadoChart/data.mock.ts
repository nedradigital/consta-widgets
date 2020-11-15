const colors: readonly [string, string] = ['#E5437C', '#9F0CE9']

export const interactiveData = {
  colors,
  groups: [
    {
      groupName: 'АО Мессояханефтегаз',
      values: [10, 6],
    },
    {
      groupName: 'ООО ГПН-Оренбург',
      values: [6, 3],
    },
    {
      groupName: 'ООО ГПН-Заполярье',
      values: [4, 3],
    },
    {
      groupName: 'ООО ГПН-Ямал',
      values: [1, 2],
    },
    {
      groupName: 'ООО ГПН-Восток',
      values: [7, 13],
    },
    {
      groupName: 'ООО Газпром-инвест',
      values: [4, 12],
    },
  ],
  unit: 'млн руб.',
} as const
