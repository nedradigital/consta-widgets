import { Group as CoreGroup } from '@/core/BarChart'

import { Group } from './'

export const transformGroupsToCoreGroups = (groups: readonly Group[]): readonly CoreGroup[] => {
  return groups.map(group => ({
    ...group,
    values: group.values.map(item => ({ [item.colorGroupName]: item.value })),
  }))
}
