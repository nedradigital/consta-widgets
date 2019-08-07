import pluralize from 'pluralize-ru'

const plural = (...args: any) => (count: number | string) => pluralize(count, ...args)

export const getDayPlural = plural('%d дней', '%d день', '%d дня', '%d дней')

export const getHourPlural = plural('%d часов', '%d час', '%d часа', '%d часов')

export const getFbPlural = plural('%d стволов', '%d ствол', '%d ствола', '%d стволов')

export const getStagePlural = plural('%d стадий', '%d стадия', '%d стадии', '%d стадий')
