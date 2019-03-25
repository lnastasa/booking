import { LOGIN, LOGOUT } from "../constants/index";

const initialState = {
    user: {}
};
function rootReducer(state = initialState, action) {
    if (action.type === LOGIN) {
        return Object.assign({}, state, {
            user: action.payload
        });
    }
    if (action.type === LOGOUT) {
        return Object.assign({}, state, {
            user: {}
        });
    }
    return state;
}
export default rootReducer;