import { toggleMission, balrog, shallNotPassLog } from '../actions';
import { shallNotPass } from '../middlewares';

describe('middlewares', () => {
  describe('shallNotPass', () => {
    const next = (action) => action;

    it('shall pass', () => {
      const passAction = toggleMission(1);
      expect(shallNotPass()(next)(passAction)).toEqual(passAction);
    });

    it('shall not pass', () => {
      const notPassAction = balrog();
      expect(shallNotPass()(next)(balrog())).toEqual(shallNotPassLog(notPassAction.type));
    });
  })
});