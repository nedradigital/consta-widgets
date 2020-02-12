import { readdirSync } from 'fs'
import { sortBy } from 'lodash'

import * as widgets from '../'

const exportedWidgets = sortBy(Object.keys(widgets))
const allWidgets = sortBy(readdirSync('src/widgets').filter(item => !/(\.)|(__.*__)/.test(item)))
const widgetsNameIdMap = allWidgets.reduce<Record<string, string>>((acc, name) => {
  acc[name] = require(`../${name}`).widgetId
  return acc
}, {})
const widgetsIds = Object.values(widgetsNameIdMap)

describe('widgets', () => {
  it('проверяем что все виджеты экспортируют свои идентификаторы', () => {
    expect(widgetsIds).not.toEqual(expect.arrayContaining([undefined]))
    expect(widgetsIds.length).toEqual(allWidgets.length)
  })

  it('проверяем что все виджеты экспортируются из конструктора', () => {
    expect(exportedWidgets).toEqual(allWidgets)
  })

  Object.entries(widgetsNameIdMap).forEach(([name, id]) => {
    it(`у виджета ${name} уникальный идентификатор`, () => {
      expect(widgetsIds.filter(i => i === id).length).toEqual(1)
    })
  })
})
