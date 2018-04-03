import * as selectors from '../selectors';

const mission1 = {
  id: 10,
  name: 'soluta aut quia',
  clientId: '568a68c8c08f1907004483c8',
  partnerId: '566acc3b96de2706000c948a',
  managerId: '4',
  addenda: [
    {
      workerId: '1',
      startDate: '2014-09-16T19:47:14.920Z',
      endDate: '2016-02-08T16:04:30.880Z',
      fees: { currency: 'EUR', amount: 192, unit: 'day' },
    },
    { workerId: '1', startDate: '2017-05-09T01:26:37.729Z', fees: { currency: 'EUR', amount: 494, unit: 'day' } },
    { workerId: '2', startDate: '2017-02-09T23:22:53.535Z', fees: { currency: 'EUR', amount: 337, unit: 'day' } },
    {
      workerId: '3',
      startDate: '2014-09-16T19:47:14.920Z',
      endDate: '2016-02-08T16:04:30.880Z',
      fees: { currency: 'EUR', amount: 192, unit: 'day' },
    },
  ],
};

const mission2 = {
  id: 11,
  name: 'alaborum neque rerum',
  clientId: '56c705cef3877e012d89e3ed',
  partnerId: '5682cc517696ba07003b3867',
  managerId: '4',
  addenda: [
    { workerId: '2', startDate: '2016-10-18T06:49:24.047Z', fees: { currency: 'EUR', amount: 217, unit: 'day' } },
    {
      workerId: '3',
      startDate: '2015-04-18T21:28:53.237Z',
      endDate: '2017-12-19T09:58:50.989Z',
      fees: { currency: 'EUR', amount: 181, unit: 'day' },
    },
    { workerId: '3', startDate: '2018-01-02T16:10:41.312Z', fees: { currency: 'EUR', amount: 395, unit: 'day' } },
    { workerId: '4', startDate: '2015-11-04T09:48:11.554Z', fees: { currency: 'EUR', amount: 433, unit: 'day' } },
  ],
  isSelected: true,
};

const worker1 = {
  id: '1',
  email: 'eric.basley@redpelicans.com',
  avatar: {
    color: '#67ae3f',
  },
  roles: ['admin'],
  prefix: 'Mr',
  firstName: 'Eric',
  lastName: 'Basley',
  type: 'worker',
  jobType: 'manager',
  companyId: '1',
  skills: ['Bootstrap', 'Docker', 'Mongodb', 'Nodejs', 'React'],
  phones: [
    {
      label: 'mobile',
      number: '06 43 80 11 16',
    },
  ],
};

const worker2 = {
  id: '2',
  prefix: 'Mr',
  firstName: 'Nicolas',
  lastName: 'Briemant',
  type: 'worker',
  jobType: 'manager',
  roles: ['admin'],
  email: 'nicolas.briemant@redpelicans.com',
  companyId: '1',
  skills: [],
  phones: [
    {
      label: 'mobile',
      number: '06 33 95 22 69',
    },
  ],
  avatar: {
    color: '#ff4080',
  },
};

const sort = {id: 'name', direction: true};

const initialState = {missions: {1: 'mission'}, companies: {2: 'client', 3: 'partner'}, workers: {4: worker1}};

describe('selectors', () => {
  it('should get workers', () => {
    expect(selectors.getWorkers(initialState)).toEqual({4: worker1});
  });

  it('should get missions', () => {
    expect(selectors.getMissions(initialState)).toEqual({1: 'mission'});
  });

  it('should get companies', () => {
    expect(selectors.getCompanies(initialState)).toEqual({2: 'client', 3: 'partner'});
  });

  it('should get client', () => {
    expect(selectors.getClient(2, selectors.getCompanies(initialState))).toEqual('client');
  });

  it('should get partner', () => {
    expect(selectors.getPartner(3, selectors.getCompanies(initialState))).toEqual('partner');
  });

  it('should get worker', () => {
    expect(selectors.getWorker(4, selectors.getWorkers(initialState))).toEqual(worker1);
  });

  it('should get prepared workers', () => {
    const preparedWorkers = {
      1: { workerId: '1', startDate: '2017-05-09T01:26:37.729Z', fees: { currency: 'EUR', amount: 494, unit: 'day' } },
      2: { workerId: '2', startDate: '2017-02-09T23:22:53.535Z', fees: { currency: 'EUR', amount: 337, unit: 'day' } },
    };
    expect(selectors.getPreparedWorkers(mission1.addenda, selectors.getWorkers(initialState))).toEqual(preparedWorkers);
  });
  /*
  it('should get mission boundaries', () => {

  });

  it('should get enhanced missions', () => {

  });

  it('should get filtered missions', () => {

  });

  it('should get spotlighted missions', () => {

  });

  it('should get sorted missions', () => {
    const state = { missions: { collection: {[mission1.id]: mission1, [mission2.id]: mission2}, sort } };
    const expectedState = [mission2, mission1];
    expect(selectors.getSortedMissions(state)).toEqual(expectedState);
  });

  it('should get selected missions', () => {
    const state = { missions: { collection: {[mission1.id]: mission1, [mission2.id]: mission2} } };
    const expectedState = { missions: { collection: {[mission1.id]: mission1} } };
    expect(selectors.getSelectedMissions(state)).toEqual(expectedState);
  });
*/
  it('should get missions total count', () => {
    const state = { missions: { collection: {[mission1.id]: mission1, [mission2.id]: mission2} } };
    expect(selectors.getMissionTotalCount(state)).toEqual(2);
  });

  it('should get missions filtered/spotlighted count', () => {
    const state = { missions: { spotlight: 'aut', collection: {[mission1.id]: mission1, [mission2.id]: mission2} } };
    expect(selectors.getMissionSelectedCount(state)).toEqual(1);
  });

  it('should get missions selected count', () => {
    const state = { missions: { collection: {[mission1.id]: mission1, [mission2.id]: mission2} } };
    expect(selectors.getMissionSelectedCount(state)).toEqual(1);
  });
});