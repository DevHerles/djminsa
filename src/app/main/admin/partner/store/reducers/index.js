import {combineReducers} from 'redux';
import record from './partner.reducer';
import records from './partners.reducer';

const reducer = combineReducers({
  records,
  record,
});

export default reducer;