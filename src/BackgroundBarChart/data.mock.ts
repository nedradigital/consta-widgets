import { Group } from '.'

const colors = {
  backgroundNormal: 'rgba(10, 165, 255, 0.3)',
  backgroundAlert: 'rgba(235, 87, 87, 0.3)',
  backgroundNormalDisabled: 'rgba(10, 165, 255, 0.15)',
  backgroundAlertDisabled: 'rgba(235, 87, 87, 0.15)',
  normal: 'var(--color-bg-normal)',
  alert: 'var(--color-bg-alert)',
  stripesAlert:
    'repeating-linear-gradient(45deg, var(--color-bg-alert), var(--color-bg-alert) 2px, transparent 2px, transparent 4px, var(--color-bg-alert) 4px, var(--color-bg-alert) 6px)',
}

const valueNames = ['ПВ'] as const
const bgValueNames = ['Всего', 'Отклонение'] as const

export const groups: readonly Group[] = [
  {
    groupName: 'Бурение',
    values: [{ value: 22, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 22, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'ВМР/Движка',
    values: [{ value: 3, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 25, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'Обустройство',
    values: [{ value: 5, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 30, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'КРС (ПР к ГРП)',
    values: [{ value: 5, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 35, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'ГРП',
    values: [{ value: 3, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 38, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'ГНКТ',
    values: [{ value: 1, color: colors.normal, name: valueNames[0] }],
    backgroundValues: [{ value: 39, color: colors.backgroundNormal, name: bgValueNames[0] }],
  },
  {
    groupName: 'КРС (ЗР к ГРП)',
    values: [{ value: 3, color: colors.stripesAlert, name: valueNames[0] }],
    backgroundValues: [
      { value: 39, color: colors.backgroundNormalDisabled, name: bgValueNames[0] },
      { value: 3, color: colors.backgroundAlertDisabled, name: bgValueNames[1] },
    ],
    isDisabled: true,
  },
  {
    groupName: 'ВНР',
    values: [{ value: 3, color: colors.stripesAlert, name: valueNames[0] }],
    backgroundValues: [
      { value: 42, color: colors.backgroundNormalDisabled, name: bgValueNames[0] },
      { value: 3, color: colors.backgroundAlertDisabled, name: bgValueNames[1] },
    ],
    isDisabled: true,
  },
]
