import * as React from 'react'

import { shallow } from 'enzyme'

import { Badge, statuses } from '../'
import css from '../index.css'

describe('Badge', () => {
  it('отображает текст', () => {
    const wrapper = shallow(<Badge children="text" />)

    expect(wrapper.text()).toEqual('text')
  })

  it('отображается без класса статуса, если статус не задан', () => {
    const wrapper = shallow(<Badge children="text" />)

    expect(wrapper).toHaveClassName(css.badge)
    expect(wrapper).not.toHaveClassName(css.normal)
    expect(wrapper).not.toHaveClassName(css.warning)
    expect(wrapper).not.toHaveClassName(css.danger)
  })

  it('отображается с классом заданного статуса', () => {
    statuses.forEach(status => {
      const wrapper = shallow(<Badge status={status} children="text" />)

      expect(wrapper).toHaveClassName(css.badge)
      expect(wrapper).toHaveClassName(css[status])
    })
  })
})
