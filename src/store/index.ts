import {combineReducers} from 'redux';
import {usersApi} from '../services/users';

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
});

export default rootReducer;
