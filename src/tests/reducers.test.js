import deepFreeze from 'deep-freeze';
import missions from '../reducers/missions';
import * as actions from '../actions';

const mission1 = {
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

const mission2 = {
  id: 11,
  name: 'laborum neque rerum',
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

const initialState = {
  collection: {
    [mission1.id]: mission1,
    [mission2.id]: mission2,
  },
  sort: {
    id: 'name',
    direction: true, // true is asc and false is desc
  },
  filter: 'all',
  spotlight: '',
  availableSorts: ['name', 'startDate', 'endDate'],
  availableFilters: ['open', 'close', 'all'],
};

const reducer = missions({ missions: initialState});

describe('reducers', () => {
  describe('missions', () => {
    it('should return the initial state', () => {
      deepFreeze(initialState);
      expect(reducer(initialState)).toEqual(initialState);
    });

    it('should handle REMOVE_MISSION', () => {
      const expectedState = {
        ...initialState,
        collection: { [mission2.id]: mission2 },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.removeMission(mission1.id))).toEqual(expectedState);
    });

    it('should handle REMOVE_MISSIONS', () => {
      const expectedState = {
        ...initialState,
        collection: { [mission1.id]: mission1 },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.removeMissions())).toEqual(expectedState);
    });

    it('should handle TOGGLE_MISSION (select)', () => {
      const expectedState = {
        ...initialState,
        collection: {
          ...initialState.collection,
          [mission1.id]: { ...mission1, isSelected: true },
        },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.toggleMission(mission1.id))).toEqual(expectedState);
    });

    it('should handle TOGGLE_MISSION (unselect)', () => {
      const expectedState = {
        ...initialState,
        collection: {
          ...initialState.collection,
          [mission2.id]: { ...mission2, isSelected: false },
        },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.toggleMission(mission2.id))).toEqual(expectedState);
    });
    
    it('should handle SORT_MISSIONS (same)', () => {
      const expectedState = {
        ...initialState,
        sort: {
          ...initialState.sort,
          id: 'name',
          direction: false,
        },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.sortMissions('name'))).toEqual(expectedState);
    });

    it('should handle SORT_MISSIONS (different)', () => {
      const expectedState = {
        ...initialState,
        sort: {
          ...initialState.sort,
          id: 'startDate',
          direction: true,
        },
      };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.sortMissions('startDate'))).toEqual(expectedState);
    });

    it('should handle FILTER_MISSIONS', () => {
      const expectedState = { ...initialState, filter: 'open' };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.filterMissions('open'))).toEqual(expectedState);
    });

    it('should handle SPOTLIGHT_MISSIONS', () => {
      const expectedState = { ...initialState, spotlight: 'soluta' };
      deepFreeze(initialState);
      expect(reducer(initialState, actions.spotlightMissions('soluta'))).toEqual(expectedState);
    });
  });
});
