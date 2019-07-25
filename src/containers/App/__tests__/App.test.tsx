import * as React from 'react';

import { shallow } from 'enzyme';

type TestComponentProps = {
  onButtonClick: () => void;
};

function TestComponent(props: TestComponentProps) {
  return (
    <div className="TestComponent">
      <button className="TestComponent__button" onClick={props.onButtonClick}>
        Click me
      </button>
    </div>
  );
}

describe('TestComponent', () => {
  it('handles button click', () => {
    const handleButtonClick = jest.fn();
    const wrapper = shallow(<TestComponent onButtonClick={handleButtonClick} />);
    const button = wrapper.find('.TestComponent__button');

    expect(handleButtonClick).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });
});
