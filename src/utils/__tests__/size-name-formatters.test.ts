import { getFormattedFontSizeName, getFormattedMarginName } from '../size-name-formatters'

describe('getFormattedMarginName', () => {
  it('возвращает строку с размером отступа и уточнением в пикселях', () => {
    expect(getFormattedMarginName('xs')).toEqual('xs (8)')
  })
})

describe('getFormattedFontName', () => {
  it('возвращает строку с размером шрифта и уточнением в пикселях', () => {
    expect(getFormattedFontSizeName({ value: '4xl' })).toEqual('4xl (48)')
  })

  it('возвращает строку с настраиваемым именем и уточнением в пикселях', () => {
    expect(getFormattedFontSizeName({ name: 'Крупный шрифт', value: '5xl' })).toEqual(
      'Крупный шрифт (72)'
    )
  })
})
