export const REMOVE_MISSION = 'REMOVE_MISSION';
export const removeMission = (missionId) => ({ type: REMOVE_MISSION, payload: { missionId } });

export const REMOVE_MISSIONS = 'REMOVE_MISSIONS';
export const removeMissions = () => ({ type: REMOVE_MISSIONS });

export const TOGGLE_MISSION = 'TOGGLE_MISSION';
export const toggleMission = (missionId) => ({ type: TOGGLE_MISSION, payload: { missionId } });

export const SORT_MISSIONS = 'SORT_MISSIONS';
export const sortMissions = (sortId) => ({ type: SORT_MISSIONS, payload: { sortId } });

export const FILTER_MISSIONS = 'FILTER_MISSIONS';
export const filterMissions = (filterId) => ({ type: FILTER_MISSIONS, payload: { filterId } });

export const SPOTLIGHT_MISSIONS = 'SPOTLIGHT_MISSIONS';
export const spotlightMissions = (term) => ({ type: SPOTLIGHT_MISSIONS, payload: { term } });