export const formatDateToInputString = (value?: Date) => {
  if (!value || !(value instanceof Date)) {
    return ''
  }

  return value.toISOString().split('T')[0]
}
