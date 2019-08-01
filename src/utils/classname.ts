import { isNil } from 'lodash'

const concatClass = (
  name: string,
  elem?: string | null,
  mods?: { [key: string]: string | boolean | null | undefined } | null,
  mix?: string | null
) => {
  const baseName = elem ? `${name}__${elem}` : name
  const buf = [baseName]

  if (mods) {
    Object.keys(mods).forEach(modName => {
      const modVal = mods[modName]

      if (!isNil(modVal) && modVal !== false) {
        buf.push(`${baseName}_${modName}${modVal === true ? '' : `_${modVal}`}`)
      }
    })
  }

  if (mix) {
    buf.push(mix)
  }

  return buf.join(' ')
}

export const classname = (name: string) => {
  return (
    elem?: string | null,
    mods?: { [key: string]: string | boolean | null | undefined } | null,
    mix?: string | null
  ) => concatClass(name, elem, mods, mix)
}
