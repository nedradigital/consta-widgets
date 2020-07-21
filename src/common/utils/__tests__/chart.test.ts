import { getFormattedValue } from '../chart'

describe('getFormattedValue', () => {
  it('возвращает отформатированное значение', () => {
    expect(getFormattedValue(1, String)).toEqual('1')
  })

  it('возвращает заглушку при отсутствии данных', () => {
    expect(getFormattedValue(null)).toEqual('—')
  })
})
