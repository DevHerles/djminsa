import {
  combineReducers
} from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import health from './health/reducer';
import symptoms from './symptoms/reducer';
import partner from './partner/reducer';
import ubigeo from './ubigeo/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  health,
  symptoms,
  partner,
  ubigeo,
});

export default reducers;