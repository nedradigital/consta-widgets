import * as React from 'react'

import { shallow } from 'enzyme'

import { Badge, statuses } from '../'
import css from '../index.css'

describe('Badge', () => {
  it('has text', () => {
    const wrapper = shallow(<Badge children="text" />)

    expect(wrapper.text()).toEqual('text')
  })

  it('has class with default status', () => {
    const wrapper = shallow(<Badge children="text" />)

    expect(wrapper).toHaveClassName(css.badge)
    expect(wrapper).not.toHaveClassName(css.normal)
    expect(wrapper).not.toHaveClassName(css.warning)
    expect(wrapper).not.toHaveClassName(css.danger)
  })

  it('has class with custom status', () => {
    statuses.forEach(status => {
      const wrapper = shallow(<Badge status={status} children="text" />)

      expect(wrapper).toHaveClassName(css.badge)
      expect(wrapper).toHaveClassName(css[status])
    })
  })
})
