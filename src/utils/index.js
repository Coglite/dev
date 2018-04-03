import { reduce } from 'ramda';

export const indexBy = (attr) => (collection) => reduce(
  (memo, item) => ({ ...memo, [item[attr]]: item }),
  {},
  collection
);
