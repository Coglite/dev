import { filter, map, test, sortBy, toLower, prop, identity, reverse, compose, length, reduce, values } from 'ramda';
import { createSelector } from 'reselect';
import moment from 'moment';

export const getMissions = (state) => state.missions;
export const getCompanies = (state) => state.companies;
export const getWorkers = (state) => state.workers;

export const getClient = (clientId, companies) => companies[clientId];
export const getPartner = (partnerId, companies) => companies[partnerId];
export const getWorker = (managerId, workers) => workers[managerId];
export const getPreparedWorkers = (addenda, workers) => reduce(
  (memo, addendum) => {
    const id = addendum.workerId;
    const isAlreadyThere = memo[id];
    const isOpen = moment(addendum.endDate).isSameOrAfter(moment(), 'day')
    if (!isAlreadyThere && isOpen) return { ...memo, [id]: { ...addendum, ...getWorker(id, workers) } };
    return memo;
  },
  {},
  addenda
);
export const getMissionBoundaries = (addenda) => reduce(
  (memo, addendum) => {
    const aStartDate = addendum.startDate ? moment(addendum.startDate) : undefined;
    const mStartDate = memo.startDate;
    let startDate = moment();
    if (mStartDate && aStartDate) {
      startDate = mStartDate.isBefore(aStartDate) ? mStartDate : aStartDate;
    } else if (aStartDate) {
      startDate = aStartDate;
    }

    const aEndDate = addendum.endDate ? moment(addendum.endDate) : undefined;
    const mEndDate = memo.endDate;
    let endDate = moment();
    if (mEndDate && aEndDate) {
      endDate = mEndDate.isAfter(aEndDate) ? mEndDate : aEndDate;
    } else if (aEndDate) {
      endDate = aEndDate;
    }

    return { startDate, endDate };
  },
  {},
  addenda
);

export const getMissionsCollection = createSelector(getMissions, (missions) => missions.collection);
export const getMissionsSpotlight = createSelector(getMissions, (missions) => missions.spotlight);
export const getMissionsFilter = createSelector(getMissions, (missions) => missions.filter);
export const getMissionsAvailableFilters = createSelector(getMissions, (missions) => missions.availableFilters);
export const getMissionsSort = createSelector(getMissions, (missions) => missions.sort);
export const getMissionsAvailableSorts = createSelector(getMissions, (missions) => missions.availableSorts);

export const getEnhancedMissions = createSelector(
  getMissionsCollection, getCompanies, getWorkers,
  (missions, companies, workers) => map(
    ({ clientId, partnerId, managerId, addenda, ...rest}) => {
      const boundaries = getMissionBoundaries(addenda);
      return {
        ...rest,
        ...boundaries,
        client: getClient(clientId, companies),
        partner: getPartner(partnerId, companies),
        manager: getWorker(managerId, workers),
        workers: getPreparedWorkers(addenda, workers),
        isOpen: boundaries.endDate.isSameOrAfter(moment(), 'day'),
      };
    },
    missions
  )
);

export const getFilteredMissions = createSelector(
  getEnhancedMissions, getMissionsFilter,
  (missions, missionsFilter) => filter(
    (mission) => {
      switch(missionsFilter) {
        case 'open': return mission.isOpen;
        case 'close': return !mission.isOpen;
        default: return true;
      }
    },
    missions
  )
);

export const getSpotlightedMissions = createSelector(
  getFilteredMissions, getMissionsSpotlight,
  (missions, spotlight) => filter(
    (mission) => test(new RegExp(spotlight), mission.name),
    missions
  )
);

export const getSortedMissions = createSelector(
  getSpotlightedMissions, getMissionsSort,
  (missions, missionsSort) => {
    const sortByProp = (id) => sortBy(
      compose(
        (missionProp) => moment.isMoment(missionProp) ? missionProp.seconds() : toLower(missionProp),
        prop(id)
      )
    );
    const sortByDirection = direction => direction ? identity : reverse;
    return compose(sortByDirection(missionsSort.direction), sortByProp(missionsSort.id), values)(missions);
  }
);

export const getPreparedMissions = createSelector(
  getSortedMissions,
  (missions) => missions
);

export const getMissionTotalCount = createSelector(getMissionsCollection, compose(length, values));
export const getSelectedMissions = createSelector(getMissionsCollection, filter(prop('isSelected')));
export const getMissionSelectedCount = createSelector(getSelectedMissions, compose(length, values));
export const getMissionCount = createSelector(getPreparedMissions, compose(length, values));
