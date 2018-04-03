import React from 'react';
import { shallow } from 'enzyme';
import Mission from '../components/missions/mission';

const mission = {
  id: 10,
  name: 'soluta aut quia',
  clientId: '568a68c8c08f1907004483c8',
  partnerId: '566acc3b96de2706000c948a',
  managerId: '4',
  addenda: [
    {
      workerId: '5',
      startDate: '2014-09-16T19:47:14.920Z',
      endDate: '2016-02-08T16:04:30.880Z',
      fees: { currency: 'EUR', amount: 192, unit: 'day' },
    },
    { workerId: '5', startDate: '2017-05-09T01:26:37.729Z', fees: { currency: 'EUR', amount: 494, unit: 'day' } },
    { workerId: '3', startDate: '2017-02-09T23:22:53.535Z', fees: { currency: 'EUR', amount: 337, unit: 'day' } },
  ],
};

const props = {
  ...mission,
  toggleMission: () => {},
  removeMission: () => {},
}

describe('Mission', () => {
  it('should match snapshot', () => {
      const component = shallow(<Mission {...props} />);
      expect(component).toMatchSnapshot();
  });

  it('should match snapshot when selected', () => {
      const component = shallow(<Mission {...props} isSelected />);
      expect(component).toMatchSnapshot();
  });

  it('should match snapshot when hovered', () => {
      const component = shallow(<Mission {...props} />);
      component.setState({ isHovered: true });
      expect(component).toMatchSnapshot();
  });
});
