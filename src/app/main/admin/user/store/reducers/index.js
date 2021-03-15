import {combineReducers} from 'redux';
import records from './users.reducer';
import record from './user.reducer';

const reducer = combineReducers({
  records,
  record,
});

export default reducer;