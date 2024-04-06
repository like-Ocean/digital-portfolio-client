import {api} from "../index.js";

export const getUserProjectsApi = (user) => {
    return api.get(`/projects/user/${user}`)
}
