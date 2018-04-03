import { shallNotPassLog } from '../actions';

export const shallNotPass = () => (next) => (action) => {
  const FORBIDDEN_ACTION_TYPES = ['BALROG'];

  if (!FORBIDDEN_ACTION_TYPES.includes(action.type)) return next(action);

  return next(shallNotPassLog(action.type));
};

export const logger = ({ getState }) => (next) => (action) => {
  console.group(action.type); // eslint-disable-line no-console
  console.log('action:', action.type); // eslint-disable-line no-console
  console.log('payload:', action.payload); // eslint-disable-line no-console
  console.log('prevState:', getState()); // eslint-disable-line no-console
  const res = next(action);
  console.log('nextState:', getState()); // eslint-disable-line no-console
  console.groupEnd(action.type); // eslint-disable-line no-console
  return res;
};
