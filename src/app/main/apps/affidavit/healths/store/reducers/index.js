import {
  combineReducers
} from 'redux';
import records from './healths.reducer';
import record from './health.reducer';

const reducer = combineReducers({
  records,
  record,
});

export default reducer;