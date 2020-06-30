/* istanbul ignore file */
export const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !isNaN(date.valueOf())

export const isHtmlElement = (target?: EventTarget | Element | null): target is HTMLElement => {
  return target !== undefined && target instanceof HTMLElement
}
