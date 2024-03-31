import {api} from "../index.js";

export const checkAuth = () => {
    return api.get("/users/auth/check")
}
