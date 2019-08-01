import { classname } from '../classname'

const cn = classname('Base')

describe('classname', () => {
  it('should return just block classname', () => {
    expect(cn()).toBe('Base')
  })

  it('should return classname block with element', () => {
    expect(cn('element')).toBe('Base__element')
  })

  it('should return classname block with element and modifier', () => {
    expect(cn('element', { color: 'red' })).toBe('Base__element Base__element_color_red')
    expect(cn(null, { color: 'red' })).toBe('Base Base_color_red')
  })

  it('should return classname modifier without value if mod value is true', () => {
    expect(cn('element', { red: true })).toBe('Base__element Base__element_red')
  })

  it('should not return classname with modifier if mod value is false or undefined or null', () => {
    expect(cn('element', { red: false })).toBe('Base__element')
    expect(cn('element', { red: null })).toBe('Base__element')
    expect(cn('element', { red: undefined })).toBe('Base__element')
  })

  it('should mix another classname', () => {
    expect(cn('element', null, 'AnotherClass')).toBe('Base__element AnotherClass')
  })
})
