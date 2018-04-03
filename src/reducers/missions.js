import { reject, equals, prop } from 'ramda';
import {
  REMOVE_MISSION,
  REMOVE_MISSIONS,
  TOGGLE_MISSION,
  SORT_MISSIONS,
  FILTER_MISSIONS,
  SPOTLIGHT_MISSIONS,
} from '../actions';

export default (initialState) => (state = initialState, action = {}) => {
  switch(action.type) {
    case REMOVE_MISSION:
      return {
        ...state,
        collection: reject(mission => equals(mission.id, action.payload.missionId), state.collection),
      };
    case REMOVE_MISSIONS:
      return {
        ...state,
        collection: reject(prop('isSelected'), state.collection),
      };
    case TOGGLE_MISSION:
      return {
        ...state,
        collection: {
          ...state.collection,
          [action.payload.missionId]: {
            ...state.collection[action.payload.missionId],
            isSelected: !state.collection[action.payload.missionId].isSelected,
          },
        },
      };
    case SORT_MISSIONS:
      return {
        ...state,
        sort: {
          ...state.sort,
          id: action.payload.sortId,
          direction: state.sort.id === action.payload.sortId ? !state.sort.direction : true,
        },
      };
    case FILTER_MISSIONS:
      return {
        ...state,
        filter: action.payload.filterId,
      };
    case SPOTLIGHT_MISSIONS:
      return {
        ...state,
        spotlight: action.payload.term,
      };
    default:
      return state;
  }
};
