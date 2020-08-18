export const getSize = (length: number, isHorizontal: boolean) => {
  const size = `${Math.abs(length)}%`

  return {
    width: isHorizontal ? size : undefined,
    height: isHorizontal ? undefined : size,
  }
}
