import { LOG_IN, LOG_OUT } from '../actions/types';

export default function authUser(state = null, action) {
    switch (action.type) {
        case LOG_IN:
            return action.user;
        case LOG_OUT:
            return null;
        default:
            return state;
    }
}