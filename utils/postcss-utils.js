const calcSize = (size) => {
  return `calc(${size / 16} * var(--base-size))`
}

module.exports = {
  calcSize,
}
