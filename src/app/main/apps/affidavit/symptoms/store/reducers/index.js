import {
  combineReducers
} from 'redux';
import records from './symptoms.reducer';
import record from './symptom.reducer';

const reducer = combineReducers({
  records,
  record,
});

export default reducer;