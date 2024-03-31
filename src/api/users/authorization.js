import {api} from "../index.js";

export const authorizationApi = (login, password) => {
    return api.post("/users/authorization", {login, password})
}
