import { useRef } from 'react'

import * as _ from 'lodash'

let names: readonly string[] = []

type GetUniqueNameFunc = (baseName: string) => string
type RemoveNameFunc = (name: string) => void

const addNames = (...newNames: readonly string[]) => {
  names = _.union(names, newNames)
}

// Экспортим для использования в стори
export const getUniqueName: GetUniqueNameFunc = baseName => {
  let name
  let idx = 0

  do {
    name = `${baseName}_${idx}`
    idx++
  } while (names.includes(name))

  addNames(name)

  return name
}

const removeName: RemoveNameFunc = name => {
  names = _.without(names, name)
}

export function useUniqueNameGenerator(initialNames?: readonly string[]) {
  const prevNames = useRef<readonly string[]>([])

  if (initialNames && initialNames.length > 0 && !_.isEqual(prevNames.current, initialNames)) {
    prevNames.current = initialNames
    addNames(...initialNames)
  }

  return { getUniqueName, removeName }
}

// Для тестов
export function clearUniqueNamesList() {
  names = []
}
