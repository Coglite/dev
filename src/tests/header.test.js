import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header, HeaderLeft, HeaderRight } from '../components/app/header';

describe('Header', () => {
  it('should match snapchot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapchot with children', () => {
    const root = (
      <Header>
        <HeaderLeft>
          <span>left</span>
        </HeaderLeft>
      </Header>
    );
    const wrapper = mount(root);
    expect(wrapper.find(HeaderLeft)).toHaveLength(1);
  });

  it('should match snapchot with children text', () => {
    const root = (
      <Header>
        <HeaderLeft>
          <span>left</span>
        </HeaderLeft>
        <HeaderRight>
          <span>right</span>
        </HeaderRight>
      </Header>
    );
    const wrapper = mount(root);
    const expectedElements = [<span>left</span>, <span>right</span>];
    expect(wrapper.containsAllMatchingElements(expectedElements)).toEqual(true);
  });
});
