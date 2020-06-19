import { Column, Group } from './'

const getTransformColumn = (
  colorGroups: Record<string, string>,
  filter: (value: number) => boolean
) => (column: Column) => {
  if (column.value === undefined) {
    return
  }

  return filter(column.value)
    ? {
        total: column.value,
        sections: [{ color: colorGroups[column.colorGroupName], value: column.value }],
      }
    : {
        total: 0,
        section: undefined,
      }
}

export const transformGroupsToCommonGroups = (
  groups: readonly Group[],
  colorGroups: Record<string, string>
) => {
  const getColumns = getTransformColumn(colorGroups, v => v >= 0)
  const getReversedColumns = getTransformColumn(colorGroups, v => v < 0)

  return groups.map(group => {
    return {
      name: group.groupName,
      columns: group.values.map(getColumns),
      reversedColumns: group.values.map(getReversedColumns),
    }
  })
}
