import { filters, list as data } from '@/components/TableLegend/mockData'

import { filterTableData } from '../table'

describe('table', () => {
  describe('filtering', () => {
    it('возвращает исходные данные, если не выбраны фильтры', () => {
      expect(filterTableData({ data, filters, selectedFilters: {} })).toEqual(data)
    })

    it('не возвращает ничего при фильтрах за пределами данных', () => {
      expect(
        filterTableData({ data, filters, selectedFilters: { year: ['olderThan2018'] } })
      ).toEqual([])
    })

    it('фильтрует по одной строке', () => {
      expect(
        filterTableData({ data, filters, selectedFilters: { year: ['olderThan2000'] } })
      ).toEqual([data[1]])
    })

    it('фильтрует по двум строкам', () => {
      expect(
        filterTableData({
          data,
          filters,
          selectedFilters: { year: ['olderThan2000'], type: ['oil', 'condensated'] },
        })
      ).toEqual([data[1]])
    })

    it('фильтрует внутри столбцов по ИЛИ', () => {
      expect(
        filterTableData({ data, filters, selectedFilters: { type: ['oil', 'condensated'] } })
      ).toEqual([data[0], data[1], data[3], data[4]])
    })
  })
})
