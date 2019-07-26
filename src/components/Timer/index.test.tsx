import { shallow } from 'enzyme';

import { Timer } from './';

const MINUTE = 1000 * 60;
const getDateBeforeNow = (interval: number) => new Date(new Date().valueOf() - interval);

describe('Timer', () => {
  it('shows time since', () => {
    const wrapper = shallow(<Timer startTime={getDateBeforeNow(61 * MINUTE).valueOf()} />);

    expect(wrapper).toHaveText('01:01:00');
  });

  it('shows three-digit hours', () => {
    const wrapper = shallow(<Timer startTime={getDateBeforeNow(256 * 60 * MINUTE).valueOf()} />);

    expect(wrapper).toHaveText('256:00:00');
  });
});
