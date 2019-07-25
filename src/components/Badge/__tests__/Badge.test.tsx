import * as React from 'react';

import { shallow } from 'enzyme';

import { Badge, statuses } from '../index';

describe('Badge', () => {
  it('has text', () => {
    const wrapper = shallow(<Badge children="text" />);

    expect(wrapper.text()).toEqual('text');
  });

  it('has class with default status', () => {
    const wrapper = shallow(<Badge children="text" />);

    expect(wrapper.hasClass(/badge_status/)).toEqual(false);
  });

  it('has class with custom status', () => {
    statuses.forEach(status => {
      const wrapper = shallow(<Badge status={status} children="text" />);

      expect(wrapper.hasClass(`badge_status_${status}`)).toEqual(true);
    });
  });
});
