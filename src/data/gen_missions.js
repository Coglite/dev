import R from 'ramda';
import faker from 'faker';
import workers from './workers';
import companies from './companies';

const today = new Date();
const next = new Date(2020, 1, 1);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const pick = data => data[rand(0, data.length - 1)];
const pickId = R.compose(R.prop('_id'), pick);
const getWorkerAddendum = (workerId, prevDate = new Date(2014, 1, 1)) => {
  const startDate = faker.date.between(prevDate, today);
  const endDate = faker.date.between(startDate, next);
  if (startDate > today) return [];
  const addendum = {
    workerId,
    startDate,
    endDate: endDate <= today ? endDate : undefined,
    fees: {
      currency: 'EUR',
      amount: rand(180, 500),
      unit: 'day',
    },
  };
  return [addendum, ...getWorkerAddendum(workerId, endDate)];
};

const getAddenda = (workers, idx) => {
  if (!idx) return [];
  const workerId = pickId(workers);
  const remainingWorkers = R.reject(d => d._id === workerId, workers);
  return [...getWorkerAddendum(workerId), ...getAddenda(remainingWorkers, idx - 1)];
};

const blessMission = _id => ({
  _id: 10 + _id,
  name: faker.lorem.words(),
  clientId: pickId(companies),
  partnerId: rand(0, 2) ? pickId(companies) : undefined,
  managerId: pickId(workers),
  addenda: getAddenda(workers, rand(1, 5)),
});

const missions = R.times(blessMission, 100);
console.log(JSON.stringify(missions));
