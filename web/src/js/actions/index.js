import {LOGIN, LOGOUT} from "../constants/index";

function login(payload) {
    return { type: LOGIN, payload };
}

function logout(payload) {
    return { type: LOGOUT, payload };
}

export { login, logout }