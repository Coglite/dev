import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to remove a mission', () => {
    const expectedAction = { type: 'REMOVE_MISSION', payload: { missionId: 1 } };
    expect(actions.removeMission(1)).toEqual(expectedAction);
  });

  it('should create an action to remove missions', () => {
    const expectedAction = { type: 'REMOVE_MISSIONS' };
    expect(actions.removeMissions()).toEqual(expectedAction);
  });

  it('should create an action to toggle a mission', () => {
    const expectedAction = { type: 'TOGGLE_MISSION', payload: { missionId: 1 } };
    expect(actions.toggleMission(1)).toEqual(expectedAction);
  });

  it('should create an action to update missions sort', () => {
    const expectedAction = { type: 'SORT_MISSIONS', payload: { sortId: 'name' } };
    expect(actions.sortMissions('name')).toEqual(expectedAction);
  });

  it('should create an action to update missions filter', () => {
    const expectedAction = { type: 'FILTER_MISSIONS', payload: { filterId: 'open' } };
    expect(actions.filterMissions('open')).toEqual(expectedAction);
  });

  it('should create an action to update missions spotlight term', () => {
    const expectedAction = { type: 'SPOTLIGHT_MISSIONS', payload: { term: 'fruit' } };
    expect(actions.spotlightMissions('fruit')).toEqual(expectedAction);
  });
});
