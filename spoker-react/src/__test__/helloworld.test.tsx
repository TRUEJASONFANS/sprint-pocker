import 'jest';
import { mount } from 'enzyme';
import TestDemo from '../component/TestDemo'

test('TestDemo', () => {
  const wrapper = mount(<TestDemo />);
  expect(wrapper.find('div').text()).toBe('test');
});
